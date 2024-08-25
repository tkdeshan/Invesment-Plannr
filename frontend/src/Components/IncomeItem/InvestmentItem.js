import React, { useState } from "react";
import styled from "styled-components";
import { dateFormat } from "../../utils/dateFormat";
import {
  bitcoin,
  book,
  calender,
  card,
  circle,
  clothing,
  comment,
  food,
  freelance,
  medical,
  money,
  piggy,
  stocks,
  takeaway,
  trash,
  edit,
  tv,
  users,
  yt,
  chat,
} from "../../utils/icons";
import EditModal from "../UpdateIncome/updateIncome";
import Button from "../Button/Button";
import { useGlobalContext } from "../../context/globalContext";
import Swal from "sweetalert2";
import ChatBox from "../ChatBox/ChatBox";
import Loader from "../Loader/Loader";
import axios from "axios";

function InvestmentItem({
  id,
  title,
  amount,
  date,
  category,
  description,
  deleteItem,
  indicatorColor,
  type,
}) {
  const [isModalOpen, setModalOpen] = useState(false);
  const [isChatOpen, setChatOpen] = useState(false);
  const { updateInvestment, setError, getInvestments } = useGlobalContext();
  const [isLoading, setIsLoading] = useState(false);
  const [recommendations, setRecommendations] = useState("");
  const [request, setRequest] = useState("");

  const handleEdit = () => {
    setModalOpen(true);
  };

  const handleClose = () => {
    setModalOpen(false);
  };

  const handleUpdate = async (updatedItem) => {
    try {
      const result = await updateInvestment(updatedItem);
      if (result === "success") {
        Swal.fire({
          title: "Success!",
          text: "Investment updated successfully",
          icon: "success",
          confirmButtonText: "OK",
        });
        
        handleClose();
        getInvestments();
      }
    } catch (err) {
      setError(err.response?.data.message || "Failed to update investment.");
    }
  };

  const handleGetRecommendations = async () => {
    setIsLoading(true);
    const token = localStorage.getItem("token");
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/api/v1/get-invest-recommendation/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response?.data) {
        const formattedRecommendations = response.data.recommendations
          .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>") // Bold text
          .replace(/\*/g, "<br><br>"); // New line

        setRequest(response.data.formattedData);
        setRecommendations(formattedRecommendations);
        setChatOpen(!isChatOpen);
      }
    } catch (error) {
      console.error("Error fetching recommendations:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const categoryIcon = () => {
    switch (category) {
      case "salary":
        return money;
      case "freelancing":
        return freelance;
      case "investments":
        return stocks;
      case "stocks":
        return users;
      case "bitcoin":
        return bitcoin;
      case "bank":
        return card;
      case "youtube":
        return yt;
      case "other":
        return piggy;
      default:
        return "";
    }
  };

  const expenseCatIcon = () => {
    switch (category) {
      case "education":
        return book;
      case "groceries":
        return food;
      case "health":
        return medical;
      case "subscriptions":
        return tv;
      case "takeaways":
        return takeaway;
      case "clothing":
        return clothing;
      case "travelling":
        return freelance;
      case "other":
        return circle;
      default:
        return "";
    }
  };

  const savingsCatIcon = () => {
    switch (category) {
      case "education":
        return book;
      case "groceries":
        return food;
      case "health":
        return medical;
      case "subscriptions":
        return tv;
      case "takeaways":
        return takeaway;
      case "clothing":
        return clothing;
      case "travelling":
        return freelance;
      case "other":
        return circle;
      default:
        return "";
    }
  };

  const investmentCatIcon = () => {
    switch (category) {
      case "education":
        return book;
      case "groceries":
        return food;
      case "health":
        return medical;
      case "subscriptions":
        return tv;
      case "takeaways":
        return takeaway;
      case "clothing":
        return clothing;
      case "travelling":
        return freelance;
      case "other":
        return circle;
      default:
        return "";
    }
  };

  console.log("type", type);

  return (
    <>
      <EditModal
        isOpen={isModalOpen}
        onClose={handleClose}
        item={{ id, title, amount, date, category, description }}
        onUpdate={handleUpdate}
      />
      <InvestmentItemStyled indicator={indicatorColor}>
        {isLoading ? (
          <Loader />
        ) : (
          <>
            <div className="icon">{type === "investment" ? investmentCatIcon() : categoryIcon()}</div>
            <div className="content">
              <h5>{title}</h5>
              <div className="inner-content">
                <div className="text">
                  <p>LKR {amount}</p>
                  <p>
                    {calender} {dateFormat(date)}
                  </p>
                </div>
                <div className="btn-con">
                  <Button
                    icon={edit}
                    bPad={"1rem"}
                    bRad={"50%"}
                    bg={"var(--primary-color)"}
                    color={"#fff"}
                    iColor={"#fff"}
                    hColor={"var(--color-green)"}
                    onClick={handleEdit}
                  />
                  <Button
                    icon={trash}
                    bPad={"1rem"}
                    bRad={"50%"}
                    bg={"var(--primary-color)"}
                    color={"#fff"}
                    iColor={"#fff"}
                    hColor={"var(--color-green)"}
                    onClick={() => deleteItem(id)}
                  />
                  <Button
                    icon={chat}
                    bPad={"1rem"}
                    bRad={"50%"}
                    bg={"var(--primary-color)"}
                    color={"#fff"}
                    iColor={"#fff"}
                    hColor={"var(--color-green)"}
                    onClick={handleGetRecommendations}
                  />
                </div>
              </div>
              <p>{description}</p>
            </div>
          </>
        )}
      </InvestmentItemStyled>
      {isChatOpen && (
        <ChatBox
          isOpen={isChatOpen}
          recommendations={recommendations}
          request={request}
          onClose={() => setChatOpen(false)}
        />
      )}
    </>
  );
}

const InvestmentItemStyled = styled.div`
  background: #fcf6f9;
  border: 2px solid #ffffff;
  box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
  border-radius: 20px;
  padding: 1rem;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  width: 100%;
  color: #222260;

  .icon {
    width: 80px;
    height: 80px;
    border-radius: 20px;
    background: #f5f5f5;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 2px solid #ffffff;
    i {
      font-size: 2.6rem;
    }
  }

  .content {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 0.2rem;

    h5 {
      font-size: 1.3rem;
      padding-left: 2rem;
      position: relative;
      &::before {
        content: "";
        position: absolute;
        left: 0;
        top: 50%;
        transform: translateY(-50%);
        width: 0.8rem;
        height: 0.8rem;
        border-radius: 50%;
        background: ${(props) => props.indicator};
      }
    }

    .btn-con {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 1rem;
    }

    .inner-content {
      display: flex;
      justify-content: space-between;
      align-items: center;

      .text {
        display: flex;
        align-items: center;
        gap: 1.5rem;
        p {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          color: var(--primary-color);
          opacity: 0.8;
        }
      }
    }
  }
`;

export default InvestmentItem;
