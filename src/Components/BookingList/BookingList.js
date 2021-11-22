import React, { useState, useEffect } from "react";
import axios from "axios";
import useAuth from "../../hooks/useAuth";
import { Container, Badge, Row, Button } from "react-bootstrap";
import Loader from "../Loader/Loader";
import Swal from "sweetalert2";

const BookingList = () => {
  const [myBookings, setMyBookings] = useState(null);
  const {
    currentUser: { email },
    token,
  } = useAuth();
  //getting the user bookings
  useEffect(() => {
    axios
      .get(`https://vast-plains-88495.herokuapp.com/booking?email=${email}`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      })
      .then((res) => setMyBookings(res.data));
  }, [email, token]);

  //confirming deletion
  const handleCancel = (id) => {
    Swal.fire({
      title: "Are you sure to cancel it?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("Cancelled!", "Your booking has been cancelled.", "success");
        axios
          .delete(`https://vast-plains-88495.herokuapp.com/booking/${id}`)
          .then((res) => {
            if (res.data.deletedCount) {
              const remaining = myBookings.filter(
                (myPackage) => myPackage._id !== id
              );
              setMyBookings(remaining);
            }
          });
      }
    });
  };

  return (
    <>
      {myBookings ? (
        <Container className="my-5 text-black">
          {!myBookings?.length ? (
            <div>
              <h1 className="text-center mt-5 pt-5">
                You don't have any Bookings yet
              </h1>
            </div>
          ) : (
            <Row xs={1} sm={2} md={2} className="g-4">
              {myBookings?.map((myBooking) => {
                const {
                  _id,
                  status,
                  service: { image, description, title },
                } = myBooking;
                return (
                  <div style={{ backGround: "rgb(17 24 39)" }} key={_id}>
                    <div
                      style={{ borderRadius: "13px" }}
                      className="d-flex flex-column flex-lg-row border p-3 justify-content-start h-100"
                    >
                      <div className="me-5 w-100 mb-3">
                        <img
                          className="img-fluid rounded"
                          loading="lazy"
                          src={image}
                          alt={title}
                        />
                      </div>
                      <div>
                        <h4>{title}</h4>
                        <Badge
                          className="px-2 pb-2 pt-1"
                          pill
                          bg={`${
                            status === "Pending"
                              ? "danger"
                              : status === "On Going"
                              ? "warning"
                              : "success"
                          }`}
                        >
                          {status}
                        </Badge>
                        <p className="text-muted">{description}</p>
                      </div>
                      <div className="d-block ms-auto mt-auto">
                        <Button
                          onClick={() => handleCancel(_id)}
                          className="shadow-none ms-auto "
                          variant="danger"
                        >
                          Cancel
                        </Button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </Row>
          )}
        </Container>
      ) : (
        <Loader />
      )}
    </>
  );
};

export default BookingList;
