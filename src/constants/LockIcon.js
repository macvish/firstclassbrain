import * as React from "react";
import Svg, { Defs, Path } from "react-native-svg";
/* SVGR has dropped some elements not supported by react-native-svg: style */

function LockIcon(props) {
  return (
    <Svg width={16.238} height={20.667} viewBox="0 0 16.238 20.667" {...props}>
      <Defs></Defs>
      <Path
        className="a"
        d="M15.5 7.381h-.738v-.738a6.643 6.643 0 10-13.286 0v.738H.738A.738.738 0 000 8.119v11.81a.738.738 0 00.738.738H15.5a.738.738 0 00.738-.738V8.119a.738.738 0 00-.738-.738zM2.952 6.643a5.167 5.167 0 1110.333 0v.738H2.952zm11.81 12.547H1.476V8.857h13.286z"
        transform="translate(-51.2) translate(51.2)"
      />
      <Path
        className="a"
        d="M4.301 1.475a2.213 2.213 0 10-2.826 2.818V5.9a.738.738 0 101.476 0V4.288a2.209 2.209 0 001.35-2.813zM2.213 2.952a.738.738 0 11.738-.738.738.738 0 01-.738.738z"
        transform="translate(-51.2) translate(57.106 11.071)"
      />
    </Svg>
  );
}

export default LockIcon
