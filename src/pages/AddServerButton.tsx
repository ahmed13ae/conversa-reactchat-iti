// AddServerButton.tsx
import { useState, ChangeEvent, FormEvent } from "react";
import { Button, Input, Modal, TextField, Tooltip } from "@mui/material";
import axios, { AxiosError, AxiosResponse } from "axios";
import { AddCircle } from "@mui/icons-material";
import { PhotoCamera } from "@mui/icons-material";
import { useParams } from "react-router-dom"; // Import useParams

interface ServerDetails {
  name: string;
  category: string;
  member: number[];
  banner: Blob | null;
  owner: number;
  
}

interface AddServerButtonProps {
  onServerAdded: () => void;
}


const AddServerButton: React.FC<AddServerButtonProps> = ({ onServerAdded }) => {
  const { categoryId } = useParams<{ categoryId?: string }>();
  const [open, setOpen] = useState(false);

  
  const currentUserInfo = {
    userId: localStorage.getItem("user_id"),
    username: localStorage.getItem("username"),
  };

  const [serverDetails, setServerDetails] = useState<ServerDetails>({
    name: "",
    category: categoryId || "",
    member: [Number(currentUserInfo.userId)], 
    banner: null,
    owner: Number(currentUserInfo.userId), 
  });

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setServerDetails((prevDetails) => ({ ...prevDetails, [name]: value }));
  };

  const handleArrayInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setServerDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value.split(",").map((item) => item.trim()),
    }));
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setServerDetails((prevDetails) => ({
        ...prevDetails,
        banner: file,
      }));
    }
  };
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("name", serverDetails.name);
      formData.append("category", String(serverDetails.category));
      formData.append("member", serverDetails.member.join(", "));
      formData.append("owner", String(serverDetails.owner));
      formData.append("banner", serverDetails.banner as Blob);

      const response: AxiosResponse = await axios.post(
        "http://127.0.0.1:8000/api/server/",
        formData
      );

      console.log("Server added successfully:", response.data);

      handleClose();
      onServerAdded();
    } catch (error) {
      const axiosError = error as AxiosError;
      console.error(
        "Error adding server:",
        axiosError.response?.data || axiosError.message
      );
    }
  };

  
  return (
    <>
      <Tooltip title="Add Servers" arrow>
        <AddCircle
          onClick={handleOpen}
          sx={{ fontSize: 25, color: "black", marginLeft: "5px", position:'absolute' , top:'13px' , left:'180px' }}
        />
      </Tooltip>

      <Modal open={open} onClose={handleClose}>
        <div>
          <form
            encType="multipart/form-data"
            className="container d-flex justify-content-center flex-column  w-50 my-5 bg-dark" style={{height:'40vh', borderRadius:'10px'}}
            onSubmit={handleSubmit}
          >
            <TextField
              label="Server Name"
              name="name"
              value={serverDetails.name}
              onChange={handleInputChange}
              InputProps={{
                style: {
                  backgroundColor: "#1E1F22",
                  borderRadius: "10px",
                  color: "black",
                  margin: "10px",
                },
              }}
            />
            <TextField
              label="Category"
              name="category"
              value={serverDetails.category}
              onChange={handleInputChange}
              InputProps={{
                style: {
                  display:'none',
                  backgroundColor: "#1E1F22",
                  borderRadius: "10px",
                  color: "white",
                  margin: "10px",
                },
              }}
              InputLabelProps={{
                style: {
                  display:'none',
                  color: "white", // Change the color of the label here
                },
              }}
            />
            <TextField
              label="Members"
              name="member"
              value={serverDetails.member.join(", ")}
              onChange={handleArrayInputChange}
              InputProps={{
                style: {
                  display:'none',//none
                  backgroundColor: "#1E1F22",
                  borderRadius: "10px",
                  color: "white",
                  margin: "10px",
                },
              }}
              InputLabelProps={{
                style: {
                  display:'none',//none
                  color: "aliceblue", // Change the color of the label here
                },
              }}

            />
            

            <TextField
              label="Owner"
              name="owner"
              value={serverDetails.owner}
              onChange={handleInputChange}
              InputProps={{
                style: {
                  display:'none',//none
                  backgroundColor: "#1E1F22",
                  borderRadius: "10px",
                  color: "white",
                  margin: "10px",
                },
              }}
              InputLabelProps={{
                style: {
                  display:'none',//none
                  color: "aliceblue", // Change the color of the label here
                },
              }}
            />
            <Input
              type="file"
              id="file-upload"
              // accept="image/*"
              inputProps={{ accept: "image/*" }}
              style={{ display: "none" }}
              onChange={handleFileChange}
            />
            <label htmlFor="file-upload">
              <Button
                style={{
                  marginLeft: "12px",
                  backgroundColor: "#3a5cbf",
                  color: "#fff",
                }}
                component="span"
                startIcon={<PhotoCamera />}
                variant="outlined"
              >
                Upload Picture
              </Button>
            </label>

            {/* Add other fields as needed */}
            <Button
              className="btn btn-outline-primary"
              sx={{ margin: "10px", backgroundColor: "primary" }}
              type="submit"
            >
              Add Server
            </Button>
          </form>
        </div>
      </Modal>
    </>
  );
};

export default AddServerButton;