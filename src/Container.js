import { useEffect, useState } from 'react';
// Component
import Wrapper from './Wrapper';
import Logo from './Logo';
import MobileSelectBar from './MobileSelectBar.js';

const api = 'https://www.ris.gov.tw/rs-opendata/api/v1/datastore/ODRP019/109';

const Container = () => {
  const [data, setData] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedData, setSelectedData] = useState();
  const [defaultState, setDefaultState] = useState(true);

  useEffect(() => {
    getData();
  }, [])

  const getData = async () => {
    const res = await (await fetch(api)).json();
    const rawData = res.responseData;
    // pick up data of taipei
    const filterTaipeiData = rawData.filter((filterData) => {
      return filterData.site_id.slice(0, 2) === "臺北"
    })
    filterData(filterTaipeiData);
  }

  const filterData = (filterTaipeiData) => {
    // transfer to number
    let newArr = filterTaipeiData.map((numberData) => {
      let newData = {
        site_id: numberData.site_id.slice(3),
        household_ordinary_m: parseInt(numberData.household_ordinary_m),
        household_single_m: parseInt(numberData.household_single_m),
        household_ordinary_f: parseInt(numberData.household_ordinary_f),
        household_single_f: parseInt(numberData.household_single_f),
      };
      return newData
    })
    // count all needed and concat
    let concatData = newArr.reduce((prev, curr) => {
      prev[curr.site_id] = prev[curr.site_id] || {site_id: curr.site_id};
      for(let property of Object.keys(curr)){
        if(property === "site_id") continue;
        prev[curr.site_id][property] = prev[curr.site_id][property] || 0;
        prev[curr.site_id][property] += curr[property];
      }
      return prev;
    }, {});
    
    concatData = Object.keys(concatData).map(e => concatData[e]);
    // get all district
    const filterDistrict = concatData.map((filterData) => {
      let taipeiDistrict = {
        site_id: filterData.site_id
      }
      return taipeiDistrict
    })

    setDistricts(filterDistrict);
    setData(concatData);
  }

  const getSelectedData = (district) => {
    setSelectedDistrict(district);
    const filterDistrictData = data.filter((d) => {
      return d.site_id === district
    })
    const finalSelectedData = filterDistrictData.map((d) => {
      const districtData = [
        {
          name: '共同生活戶',
          pv: d.household_ordinary_m,
          uv: d.household_ordinary_f
        },
        {
          name: '獨立生活戶',
          pv: d.household_single_m,
          uv: d.household_single_f
        }
      ]
      
      return districtData
    })
    setDefaultState(false);
    setSelectedData(finalSelectedData);
  }

  return (
    <div
      className="container"
      style={{
        display: "flex",
        justifyContent: "center",
        marginTop: "2rem"
      }}
    >
      <Logo />
      <MobileSelectBar
        districts={districts}
        getSelectedData={getSelectedData}
        selectedDistrict={selectedDistrict}
        setSelectedDistrict={setSelectedDistrict}
      />
      <Wrapper
        districts={districts}
        getSelectedData={getSelectedData}
        selectedData={selectedData}
        setSelectedData={setSelectedData}
        selectedDistrict={selectedDistrict}
        defaultState={defaultState}
      />
    </div>
  );
}

export default Container;