import * as React from "react";
import Svg, { Defs, Path } from "react-native-svg";
/* SVGR has dropped some elements not supported by react-native-svg: style */

function EmailIcon(props) {
  return (
    <Svg width={23.406} height={16} viewBox="0 0 23.406 16" {...props}>
      <Defs></Defs>
      <Path
        className="a"
        d="M16.319 7.658l-3.79-4.456 3.366-1.918a.686.686 0 10-.68-1.191L8.241 4.072 1.267.093a.686.686 0 10-.68 1.191l3.367 1.921-3.79 4.456a.686.686 0 101.045.889l3.958-4.653 2.736 1.561a.686.686 0 00.68 0l2.735-1.561 3.956 4.65a.686.686 0 101.045-.889z"
        transform="translate(0 -81) translate(3.462 84.141)"
      />
      <Path
        className="a"
        d="M21.349 0H2.057A2.059 2.059 0 000 2.057v11.886A2.059 2.059 0 002.057 16h19.292a2.059 2.059 0 002.057-2.057V2.057A2.059 2.059 0 0021.349 0zm.686 13.943a.686.686 0 01-.686.686H2.057a.686.686 0 01-.686-.686V2.057a.686.686 0 01.686-.686h19.292a.686.686 0 01.686.686z"
        transform="translate(0 -81) translate(0 81)"
      />
    </Svg>
  );
}

export default EmailIcon
