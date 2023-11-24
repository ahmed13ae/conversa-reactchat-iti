// AddServerButton.tsx
import { useState, ChangeEvent, FormEvent } from "react";
import { Button, Icon, Modal, TextField, Tooltip } from "@mui/material";
import axios, { AxiosError, AxiosResponse } from "axios";
import { AddCircle } from "@mui/icons-material";

interface ServerDetails {
  name: string;
  category: number;
  member: number[];
  banner: Blob | null; // Use Blob type for banner
  owner: number;
  // Add other fields as needed
}

interface AddServerButtonProps {
  onServerAdded: () => void;
}

const AddServerButton: React.FC<AddServerButtonProps> = ({ onServerAdded }) => {
  const [open, setOpen] = useState(false);
  const [serverDetails, setServerDetails] = useState<ServerDetails>({
    name: "",
    category: 0,
    member: [],
    banner: null,
    owner: 0,
    // Add other fields as needed
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
      formData.append("banner", serverDetails.banner as Blob); // Make sure banner is a Blob type

      const response: AxiosResponse = await axios.post(
        "http://127.0.0.1:8000/api/server/",
        formData
      );

      console.log("Server added successfully:", response.data);

      handleClose();
      onServerAdded(); // Notify the parent component about the server addition
    } catch (error) {
      const axiosError = error as AxiosError;
      console.error(
        "Error adding server:",
        axiosError.response?.data || axiosError.message
      );
    }
  };
  // const handleSubmit = async (e: FormEvent) => {
  //   e.preventDefault();

  //   try {
  //     const response: AxiosResponse = await axios.post(
  //       "http://127.0.0.1:8000/api/server/",
  //       serverDetails
  //     );

  //     console.log("Server added successfully:", response.data);

  //     handleClose();
  //     onServerAdded(); // Notify the parent component about the server addition
  //   } catch (error) {
  //     const axiosError = error as AxiosError;
  //     console.error(
  //       "Error adding server:",
  //       axiosError.response?.data || axiosError.message
  //     );
  //   }
  // };

  return (
    <>
      <Tooltip title="Add Servers" arrow>
        <AddCircle onClick={handleOpen} sx={{ fontSize: 25, color: "#fff" }} />
      </Tooltip>

      <Modal open={open} onClose={handleClose}>
        <div>
          <form
            encType="multipart/form-data"
            className="container d-flex justify-content-center flex-column vh-100 w-50 my-5 bg-dark"
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
                  color: "white",
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
                  backgroundColor: "#1E1F22",
                  borderRadius: "10px",
                  color: "white",
                  margin: "10px",
                },
              }}
              InputLabelProps={{
                style: {
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
                  backgroundColor: "#1E1F22",
                  borderRadius: "10px",
                  color: "white",
                  margin: "10px",
                },
              }}
            />
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              style={{ margin: "10px" }}
            />

            <TextField
              label="Owner"
              name="owner"
              value={serverDetails.owner}
              onChange={handleInputChange}
              InputProps={{
                style: {
                  backgroundColor: "#1E1F22",
                  borderRadius: "10px",
                  color: "white",
                  margin: "10px",
                },
              }}
              InputLabelProps={{
                style: {
                  color: "aliceblue", // Change the color of the label here
                },
              }}
            />
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
