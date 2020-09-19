import React from "react";
import Svg, { Rect, Path, Circle } from "react-native-svg";
import { FunctionComponent } from "react";

interface IProps {
  color?: string;
}

const Airplane: FunctionComponent<IProps> = ({ color = "#9B9B9B" }) => {
  return (
    <Svg height="75" width="75" viewBox="-2 -2 53 53">
      <Path
        d="M32.0949413,42.1314814 C32.0585407,42.0743711 30.3027372,38.7009155 28.1931567,34.6349153 C26.0835768,30.5689135 24.3247727,27.2088265 24.2847031,27.1680547 C24.2379215,27.1204558 23.1214543,28.1840626 21.1650246,30.1400321 C18.3068845,32.9975007 18.1182741,33.2026809 18.1193772,33.4532445 C18.1200225,33.6001529 18.2374896,34.6806428 18.3804124,35.8543341 L18.6402723,37.9883172 L17.4051979,39.2288198 L16.1701235,40.4693209 L14.7368567,37.7409279 L13.3035919,35.0125356 L10.6062445,33.6043051 C9.12270443,32.829779 7.90814585,32.1785261 7.90722682,32.1570759 C7.90630757,32.1356256 8.45101806,31.5734134 9.11769425,30.9077141 L10.329833,29.6973526 L12.707497,29.9859355 L15.085161,30.2745198 L18.1648467,27.1959719 C20.5664502,24.7952541 21.2210855,24.1006429 21.1380516,24.0412095 C21.0794886,23.9992923 17.6494698,22.1817462 13.5157872,20.0022184 L6,16.0394413 L7.55211855,14.4873238 L9.10423787,12.9352063 L18.3814349,15.3937796 L27.6586342,17.8523523 L31.9006952,13.618739 C34.874043,10.6513134 36.2453298,9.33368254 36.4857199,9.21312259 C36.7071111,9.10209006 37.0188773,9.02869413 37.3652433,9.00606506 C38.0466826,8.96154459 38.5537835,9.16072088 39.0048365,9.6500547 C39.4239815,10.1047728 39.5598137,10.4477794 39.5579423,11.0467732 C39.555053,11.9719611 39.6073696,11.9093734 34.8436684,16.6865876 L30.5497732,20.9926614 L32.4045219,28.15675 C33.4246336,32.0969979 34.4815714,36.1828337 34.7532718,37.2363829 L35.2472722,39.1519271 L33.7041983,40.6936236 C32.5576859,41.8391104 32.1441159,42.2086338 32.0949413,42.1314814 Z"
        id="path1962"
        fill={color}
        fillRule="nonzero"
      ></Path>
      <Circle
        stroke={color}
        strokeWidth="2"
        cx="24.5"
        cy="24.5"
        r="25.5"
      ></Circle>
    </Svg>
  );
};

export default Airplane;