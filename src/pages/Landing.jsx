import React from "react";
import "../App.css";
import { Link, useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";

const LandingPage = () => {
  const router = useNavigate();

  return (
    <div className="landingPageContainer" style={{
       backgroundImage: `url(${assets.background})`,
       backgroundSize: "cover",
       backgroundPosition: "center",
       height: "100vh",
       width: "100%",
    }}>
      <nav>
        <div className="navHeader">
          <h2
            style={{
              fontSize: "1.3rem",
              fontFamily:
                '"Almaden Sans", Helvetica, "Noto Sans JP", "Noto Sans KR", "Noto Sans SC", "Noto Sans TC", "Noto Sans", Arial, sans-serif',
              fontWeight: "bold",
            }}
          >
            MEETRA
            <img
               src={`${assets.chatlogo}`}
              style={{ width: "30px" }}
              alt="logo"
            />{" "} 
          </h2>
        </div>
        <div
          className="navlist" 
          style={{
            fontFamily:
              '"Almaden Sans", Helvetica, "Noto Sans JP", "Noto Sans KR", "Noto Sans SC", "Noto Sans TC", "Noto Sans", Arial, sans-serif',
           }}
        >
          <p
            onClick={() => {
              router("/guest");
            }} 
          >
            Join as Guest
          </p>
          <p
            onClick={() => {
              router("/auth");
            }}
          >
            Register
          </p>
          <div role="button">
            <p
              onClick={() => {
                router("/auth");
              }}
            >
              Login
            </p>
          </div>
        </div>
      </nav>

      <div className="landingMainContainer">
        <div>
          <h1
            style={{
              fontFamily: '"Happy Face", Helvetica, Arial, sans-serif',
              fontSize: "3.7rem",
              paddingBottom: "10px",
              fontWeight: 700,
              color: "#D1D5DB",
            }}
          >
            {" "}
            Turn Miles into <span style={{ color: "#006BE5" }}>Moments</span>
          </h1>

          <p
            style={{
              color: "#D1D5DB",
              fontFamily: '"Happy Face", Helvetica, Arial, sans-serif',
              fontSize: "1.4rem",
              fontWeight: 400,
              paddingTop: "2px",
            }}
          >
            Quick hellos or long talks - Meetra keeps it real.
          </p>
          <div
            role="button"
            style={{
              fontFamily:
                '"Almaden Sans", Helvetica, "Noto Sans JP", "Noto Sans KR", "Noto Sans SC", "Noto Sans TC", "Noto Sans", Arial, sans-serif',
            }} 
          >
            <Link to={"/auth"} className="hero-btn">
              Let's Meet
            </Link>
          </div>
        </div>
        <div>
          <img
            src={`${assets.messagerVC}`}
            alt="hero image"
            style={{ width: "30vw" }}
          />
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
