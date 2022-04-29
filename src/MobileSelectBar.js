const MobileSelectBar = (props) => {
  const { getSelectedData, districts, selectedDistrict } = props;
  return (
    <div
      className="mobile-select-bar"
      style={{
        display: "none",
        textAlign: "center",
        fontWeight: "600"
      }}
    >
      <span style={{"marginRight": "1rem"}}>地區</span>
      <select
        onChange={(e) => getSelectedData(e.target.value)}
        value={selectedDistrict}
        name="site_id"
        id="district_code"
        style={{
          width: "7rem",
          height: "100%",
          fontSize: "1rem",
          fontWeight: "600"
        }}
      >
        <option value="" disabled hidden>請選擇</option>
        {
          districts.map((district) => {
            return (
              <option 
                key={district.site_id}
                value={district.site_id}
              >
                {district.site_id}
              </option>
            )
          })
        }
      </select>
    </div>
  );
}

export default MobileSelectBar;