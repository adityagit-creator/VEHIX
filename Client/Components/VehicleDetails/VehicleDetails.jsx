import React, { useState, useContext } from "react";
import { format, addDays } from "date-fns";
import TextField from "@mui/material/TextField";
import "./VehicleDetails.css";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import UserContext from "../../UserContext/UserContext";
import axios from "axios";

const VehicleDetails = () => {
  const { vehicles } = useContext(UserContext);
  const { setVehicles } = useContext(UserContext);
  const [ numberPlate, setNumberPlate] = useState("");
  const [ selectedVehicle, setSelectedVehicle] = useState("");
  const [ previousServiceDate, setPreviousServiceDate] = useState("");
  const [ nextServiceDays, setNextServiceDays] = useState("");

  const handleAddVehicle = async (e) => {
    e.preventDefault();
    if (numberPlate && !vehicles.find((v) => v.numberPlate === numberPlate)) {
      const newVehicle = {
        numberPlate,
        previousServiceDate: null,
        nextServiceDate: null,
      };
      setVehicles([...vehicles, newVehicle]);
      setNumberPlate("");
    }
  };

  const deleteVehicle = (index) => {
    setVehicles((prevVehicle) => prevVehicle.filter((_, i) => i !== index));
  };

  const handleUpdateServiceDetails = () => {
    if (selectedVehicle !== "") {
      const updatedVehicles = vehicles.map((v, index) => {
        if (index === selectedVehicle) {
          return {
            ...v,
            previousServiceDate: new Date(previousServiceDate),
            nextServiceDate: addDays(
              new Date(previousServiceDate),
              parseInt(nextServiceDays)
            ),
          };
        }
        return v;
      });
      setVehicles(updatedVehicles);
      setPreviousServiceDate("");
      setNextServiceDays("");
      setSelectedVehicle("");
    }
  };
  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    "&:last-child td, &:last-child th": {
      border: 0,
    },
  }));

  return (
    <section className="v-wrapper">
      <div className="paddings innerWidth v-container">
        <h1 className="primaryText">Your Vehicles</h1>
        <h1 className="secondaryText">Keep a track of your vehicles</h1>

        {/* Section 1: Add Vehicle */}
        <div className="vehicles">
          <div className="paddings add-vehicle">
            <h1 className="orangeText">Add a vehicle</h1>
            <TextField
              id="outlined-basic"
              label="Number plate"
              variant="outlined"
              onChange={(e) => setNumberPlate(e.target.value)}
              value={numberPlate}
            />
            <button className="button" onClick={handleAddVehicle}>
              Add Vehicle
            </button>
          </div>
          <div className="display-vehicles">
            {vehicles.map((v, index) => (
              <div className="paddings vehicle-item" key={index}>
                <img src="./vehicleCover.jpg" alt="" width={100} />
                <span>{v.numberPlate}</span>
                <button
                  className="delete-button"
                  onClick={() => deleteVehicle(index)}
                >
                  Delete Vehicle
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Section 2: Vehicle Selection and Service Details Update */}
        {vehicles.length > 0 && (
          <div className="update-service-details">
            <h1 className="primaryText">Update Service Details</h1>
            <FormControl>
              <InputLabel id="select-vehicle-label">Select Vehicle</InputLabel>
              <Select
                labelId="select-vehicle-label"
                id="select-vehicle"
                value={selectedVehicle}
                onChange={(e) => setSelectedVehicle(e.target.value)}
                label="Select Vehicle"
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                {vehicles.map((v, index) => (
                  <MenuItem key={index} value={index}>
                    {v.numberPlate}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            {selectedVehicle !== "" && (
              <div className="setting-date">
                <span>
                  <InputLabel>Previous Service Date</InputLabel>
                  <TextField
                    id="outlined-basic"
                    variant="outlined"
                    type="date"
                    value={previousServiceDate}
                    onChange={(e) => setPreviousServiceDate(e.target.value)}
                  />
                </span>
                <span>
                  <InputLabel>Days until Next Service</InputLabel>
                  <TextField
                    id="outlined-basic"
                    type="number"
                    variant="outlined"
                    value={nextServiceDays}
                    onChange={(e) => setNextServiceDays(e.target.value)}
                  />
                </span>
                <button
                  className="button2"
                  onClick={handleUpdateServiceDetails}
                >
                  Update Service Details
                </button>
              </div>
            )}
          </div>
        )}

        {/* Section 3: Vehicle and Service Reminders Display */}
        <div className="service-reminders">
          <h1 className="primaryText">Service Reminders</h1>
          <div className="reminder-table">
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 700 }} aria-label="customized table">
                <TableHead>
                  <TableRow>
                    <StyledTableCell>Number Plate</StyledTableCell>
                    <StyledTableCell align="right">
                      Previous Service Detail
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      Next Service Detail
                    </StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {vehicles.map((v, index) => (
                    <StyledTableRow key={index}>
                      <StyledTableCell component="th" scope="row">
                        {v.numberPlate}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        {v.previousServiceDate
                          ? format(v.previousServiceDate, "yyyy-MM-dd")
                          : "N/A"}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        {v.nextServiceDate
                          ? format(v.nextServiceDate, "yyyy-MM-dd")
                          : "N/A"}
                      </StyledTableCell>
                    </StyledTableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VehicleDetails;
