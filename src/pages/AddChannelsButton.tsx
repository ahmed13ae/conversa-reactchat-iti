// AddChannelsButton.tsx
import { useState, ChangeEvent, FormEvent } from "react";
import { Button, Icon, Modal, TextField, Tooltip } from "@mui/material";
import axios, { AxiosError, AxiosResponse } from "axios";
import { AddCircle } from "@mui/icons-material";

interface ChannelsDetails {
  name: string;
  server: number;
  topic: string;
  owner: number;
  // Add other fields as needed
}

interface AddChannelsButtonProps {
  onServerAdded: () => void;
}

const AddChannelsButton: React.FC<AddChannelsButtonProps> = ({ onServerAdded }) => {
  const [open, setOpen] = useState(false);
  const [ChannelsDetails, setChannelsDetails] = useState<ChannelsDetails>({
    name: "",
    server: 0,
    topic: "default topic",
    owner: 1,
    // Add other fields as needed
  });

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setChannelsDetails((prevDetails) => ({ ...prevDetails, [name]: value }));
  };

  const handleArrayInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setChannelsDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value.split(",").map((item) => item.trim()),
    }));
  };

//   const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];
//     if (file) {
//       setChannelsDetails((prevDetails) => ({
//         ...prevDetails,
//         banner: file,
//       }));
//     }
//   };
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("name", ChannelsDetails.name);
      formData.append("server", String(ChannelsDetails.server));
      formData.append("topic", String(ChannelsDetails.topic));
      formData.append("owner", String(ChannelsDetails.owner));


    //   formData.append("member", ChannelsDetails.member.join(", "));
    //   formData.append("owner", String(ChannelsDetails.owner));
    //   formData.append("banner", ChannelsDetails.banner as Blob); // Make sure banner is a Blob type

      const response: AxiosResponse = await axios.post(
        "http://127.0.0.1:8000/api/server/channel/",
        formData
      );

      console.log("Channels added successfully:", response.data);

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

  return (
    <>
      <Tooltip title="Add Channels" arrow>
        <AddCircle onClick={handleOpen} sx={{ fontSize: 25, color: "#728bd4", marginLeft:'5px' }} />
      </Tooltip>

      <Modal open={open} onClose={handleClose}>
        <div>
          <form
            encType="multipart/form-data"
            className="container d-flex justify-content-center flex-column vh-100 w-50 my-5 bg-dark"
            onSubmit={handleSubmit}
          >
            <TextField
              label="Channels Name"
              name="name"
              value={ChannelsDetails.name}
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
              label="Server"
              name="server"
              value={ChannelsDetails.server}
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
              label="Topic"
              name="topic"
              value={ChannelsDetails.topic}
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
            {/* <input className="btn btn-outline"
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              style={{ margin: "10px", color:'white' }}
            /> */}

            <TextField
              label="Owner"
              name="owner"
              value={ChannelsDetails.owner}
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
              Add Channels
            </Button>
          </form>
        </div>
      </Modal>
    </>
  );
};

export default AddChannelsButton;
