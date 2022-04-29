import { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, LabelList } from 'recharts';

const defaultData = [
  {
    name: '共同生活戶',
    uv: 0,
    pv: 0
  },
  {
    name: '獨立生活戶',
    uv: 0,
    pv: 0
  }
];

const mobileSize = [
  { width: 500, height: 300, barGap: 15, barCategoryGap: 30 },
  { width: 300, height: 400, barGap: 10, barCategoryGap: 20 }
];

const Chart = (props) => {
  const { selectedData, defaultState } = props;

  const [defaultSize, setDefaultSize] = useState({
    width: 500,
    height: 300,
    barGap: 15,
    barCategoryGap: 30
  })
  const [windowDimenion, detectWidth] = useState({winWidth: window.innerWidth})

  const detectSize = () => {
    detectWidth({ winWidth: window.innerWidth })
  }

  useEffect(() => {
    detectSize()
    if(windowDimenion.winWidth <= 768) {
      setDefaultSize(mobileSize[1])
    } else {
      setDefaultSize(mobileSize[0])
    }
  }, [windowDimenion]);

  return (
    <>
      {defaultState ? (
        <BarChart
          width={defaultSize.width}
          height={defaultSize.height}
          data={defaultData}
          barGap={defaultSize.barGap}
          barCategoryGap={defaultSize.barCategoryGap}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5
          }}
          style={{margin: "1.5rem auto"}}
        >
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="name"
            tick={{
              "fill": "#7f7f7f",
              "fontSize": "1rem",
              "fontWeight": "600"
            }}
            axisLine={false}
          />
          <YAxis axisLine={false} tickCount={9} />
          <Tooltip />
          <Legend
            width={defaultSize.width}
            wrapperStyle={{ fontWeight: "600" }}
          />
          <Bar dataKey="pv" legendType="square" name="男" fill="#5e7d9c">
            <LabelList dataKey="pv" position="top" style={{ fontWeight: "600", fill: "#852426" }} />
          </Bar>
          <Bar dataKey="uv" legendType="square" name="女" fill="#f36094">
            <LabelList dataKey="uv" position="top" style={{ fontWeight: "600", fill: "#852426" }} />
          </Bar>
        </BarChart>
      ) : (
        <BarChart
          width={defaultSize.width}
          height={defaultSize.height}
          data={selectedData?.[0]}
          barGap={defaultSize.barGap}
          barCategoryGap={defaultSize.barCategoryGap}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5
          }}
          style={{margin: "1.5rem auto"}}
        >
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="name"
            tick={{
              "fill": "#7f7f7f",
              "fontSize": "1rem",
              "fontWeight": "600"
            }}
            axisLine={false}
          />
          <YAxis axisLine={false} tickCount={10} />
          <Tooltip />
          <Legend
            width={defaultSize.width}
            wrapperStyle={{ fontWeight: "600" }}
          />
          <Bar dataKey="pv" legendType="square" name="男" fill="#5e7d9c">
            <LabelList dataKey="pv" position="top" style={{ fontWeight: "600", fill: "#852426" }} />
          </Bar>
          <Bar dataKey="uv" legendType="square" name="女" fill="#f36094">
            <LabelList dataKey="uv" position="top" style={{ fontWeight: "600", fill: "#852426" }} />
          </Bar>
        </BarChart>
      )}
    </>
  )
}

export default Chart;