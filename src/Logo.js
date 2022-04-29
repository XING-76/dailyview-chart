import TaipeiLogo from './assets/taipeilogo.png';

const Logo = () => {
  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          margin: "1.5rem",
          fontWeight: "600"
        }}
      >
        <img src={TaipeiLogo} alt="logo" style={{width: "5rem", marginBottom: ".5rem"}}/>
        <span>109 年人口戶數及性別</span>
      </div>
    </>
  );
}

export default Logo;
