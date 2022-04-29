import SelectBar from './SelectBar';
import Chart from './Chart';

const Wrapper = (props) => {
  const {
    getSelectedData,
    selectedData,
    districts,
    selectedDistrict,
    setSelectedData,
    defaultState
  } = props;
  return (
    <div
      className="wrapper-chart"
      style={{
        display: "flex",
        flexDirection: "column",
        textAlign: "center",
        padding: "6rem 2rem 1rem 0",
        backgroundColor: "#f4f4f4",
      }}
    >
      <SelectBar
        districts={districts}
        getSelectedData={getSelectedData}
        selectedDistrict={selectedDistrict}
      />
      <Chart
        selectedData={selectedData}
        getSelectedData={getSelectedData}
        setSelectedData={setSelectedData}
        defaultState={defaultState}
      />
    </div>
  );
}

export default Wrapper;
