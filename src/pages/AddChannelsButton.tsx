import { useState, ChangeEvent, FormEvent } from "react";
import { Button, Modal, TextField, Tooltip } from "@mui/material";
import axios, { AxiosError, AxiosResponse } from "axios";
import { AddCircle } from "@mui/icons-material";
import { useParams } from "react-router-dom";

interface ChannelsDetails {
  name: string;
  server: number;
  topic: string;
  owner: number;
}

interface AddChannelsButtonProps {
  onServerAdded: () => void;
}

const AddChannelsButton: React.FC<AddChannelsButtonProps> = ({ onServerAdded }) => {
  const { serverId } = useParams<{ serverId?: string }>();
  const [open, setOpen] = useState(false);

  const currentUserInfo = {
    userId: localStorage.getItem("user_id"),
    username: localStorage.getItem("username"),
  };

  const [channelsDetails, setChannelsDetails] = useState<ChannelsDetails>({
    name: "",
    server: serverId ? Number(serverId) : 1,
    topic: "default topic",
    owner: currentUserInfo.userId ? Number(currentUserInfo.userId) : 1,
  });

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setChannelsDetails((prevDetails) => ({ ...prevDetails, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("name", channelsDetails.name);
      formData.append("server", String(channelsDetails.server));
      formData.append("topic", String(channelsDetails.topic));
      formData.append("owner", String(channelsDetails.owner));
      const response: AxiosResponse = await axios.post(
        "http://127.0.0.1:8000/api/server/channel/",
        formData
      );

      console.log("Channels added successfully:", response.data);

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
      <Tooltip title="Add Channels" arrow>
        <AddCircle onClick={handleOpen} sx={{ fontSize: 25, color: "#728bd4", marginLeft:'5px' }} />
      </Tooltip>

      <Modal open={open} onClose={handleClose}>
        <div>
          <form
            encType="multipart/form-data"
            className="container d-flex justify-content-center flex-column  w-50 my-5 bg-dark"style={{height:'40vh', borderRadius:'10px'}}
            onSubmit={handleSubmit}
          >
            <TextField
              label="Channels Name"
              name="name"
              value={channelsDetails.name}
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
              value={channelsDetails.server}
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
                  color: "white",
                },
              }}
            />
            <TextField
              label="Topic"
              name="topic"
              value={channelsDetails.topic}
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
                  display:'none',
                  color: "aliceblue",
                },
              }}
            />
            
            <TextField
              label="Owner"
              name="owner"
              value={channelsDetails.owner}
              onChange={handleInputChange}
              InputProps={{
                style: {
                  backgroundColor: "#1E1F22",
                  borderRadius: "10px",
                  color: "white",
                  margin: "10px",
                  display:'none'
                },
              }}
              InputLabelProps={{
                style: {
                  color: "aliceblue",
                  display:'none'
                },
              }}
            />
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
