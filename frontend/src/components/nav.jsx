import React from "react";

const Nav = () => {
  return (
    <nav class="container flex items-center justify-around pt-4 pb-3 sticky top-0 z-50">
      <div
        class="cursor-pointer rounded-full p-4 transition duration-300 lg:py-3.5 lg:px-6 bg-gray-200 bg-opacity-60 hover:bg-opacity-80 backdrop-blur text-gray-900"
        style={{ transform: "none" }}
      >
        <a href="/">
          <svg
            class="h-4 lg:h-5"
            height="100%"
            viewBox="0 0 1811 292"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M44.5009 105.609C52.0195 95.2385 62.2603 86.8124 75.2235 80.3309C88.4458 73.59 103.094 70.2196 119.168 70.2196C138.095 70.2196 155.206 74.7567 170.502 83.8309C185.799 92.9051 197.855 105.868 206.669 122.72C215.484 139.313 219.892 158.369 219.892 179.888C219.892 201.406 215.484 220.721 206.669 237.833C197.855 254.685 185.669 267.907 170.113 277.5C154.817 286.833 137.835 291.5 119.168 291.5C102.576 291.5 87.7977 288.259 74.8346 281.778C62.1307 275.296 52.0195 267 44.5009 256.889V288H0.167013V0.218811H44.5009V105.609ZM174.78 179.888C174.78 165.11 171.669 152.406 165.447 141.776C159.484 130.887 151.447 122.72 141.335 117.276C131.483 111.572 120.854 108.72 109.446 108.72C98.2978 108.72 87.6681 111.572 77.5568 117.276C67.7049 122.98 59.6677 131.276 53.4454 142.165C47.4824 153.054 44.5009 165.887 44.5009 180.665C44.5009 195.443 47.4824 208.406 53.4454 219.555C59.6677 230.444 67.7049 238.74 77.5568 244.444C87.6681 250.148 98.2978 253 109.446 253C120.854 253 131.483 250.148 141.335 244.444C151.447 238.481 159.484 229.925 165.447 218.777C171.669 207.629 174.78 194.666 174.78 179.888ZM308.067 0.218811V288H263.734V0.218811H308.067ZM560.332 73.7197V288H515.998V262.722C508.998 271.537 499.794 278.537 488.386 283.722C477.238 288.648 465.312 291.111 452.608 291.111C435.756 291.111 420.589 287.611 407.108 280.611C393.885 273.611 383.385 263.24 375.607 249.5C368.089 235.759 364.329 219.166 364.329 199.721V73.7197H408.274V193.11C408.274 212.295 413.071 227.073 422.663 237.444C432.256 247.555 445.349 252.611 461.942 252.611C478.534 252.611 491.627 247.555 501.22 237.444C511.072 227.073 515.998 212.295 515.998 193.11V73.7197H560.332ZM815.218 175.61C815.218 183.647 814.699 190.906 813.662 197.388H649.938C651.234 214.499 657.586 228.24 668.994 238.611C680.401 248.981 694.402 254.166 710.994 254.166C734.847 254.166 751.699 244.185 761.551 224.221H809.384C802.903 243.925 791.107 260.129 773.995 272.833C757.143 285.278 736.143 291.5 710.994 291.5C690.513 291.5 672.105 286.963 655.772 277.889C639.697 268.555 626.993 255.592 617.66 238.999C608.586 222.147 604.049 202.703 604.049 180.665C604.049 158.628 608.456 139.313 617.271 122.72C626.345 105.868 638.92 92.9051 654.994 83.8309C671.327 74.7567 689.994 70.2196 710.994 70.2196C731.217 70.2196 749.236 74.6271 765.051 83.442C780.866 92.2569 793.181 104.702 801.996 120.776C810.81 136.591 815.218 154.869 815.218 175.61ZM768.94 161.61C768.68 145.276 762.847 132.183 751.439 122.331C740.032 112.479 725.902 107.553 709.05 107.553C693.753 107.553 680.661 112.479 669.772 122.331C658.883 131.924 652.401 145.017 650.327 161.61H768.94Z"
              fill="#5169F6"
            ></path>
            <path
              fill="black"
              d="M903.181 0.218811V288H858.847V0.218811H903.181ZM1157.78 175.61C1157.78 183.647 1157.26 190.906 1156.22 197.388H992.499C993.795 214.499 1000.15 228.24 1011.55 238.611C1022.96 248.981 1036.96 254.166 1053.55 254.166C1077.41 254.166 1094.26 244.185 1104.11 224.221H1151.94C1145.46 243.925 1133.67 260.129 1116.56 272.833C1099.7 285.278 1078.7 291.5 1053.55 291.5C1033.07 291.5 1014.67 286.963 998.332 277.889C982.258 268.555 969.554 255.592 960.22 238.999C951.146 222.147 946.609 202.703 946.609 180.665C946.609 158.628 951.017 139.313 959.832 122.72C968.906 105.868 981.48 92.9051 997.554 83.8309C1013.89 74.7567 1032.55 70.2196 1053.55 70.2196C1073.78 70.2196 1091.8 74.6271 1107.61 83.442C1123.43 92.2569 1135.74 104.702 1144.56 120.776C1153.37 136.591 1157.78 154.869 1157.78 175.61ZM1111.5 161.61C1111.24 145.276 1105.41 132.183 1094 122.331C1082.59 112.479 1068.46 107.553 1051.61 107.553C1036.31 107.553 1023.22 112.479 1012.33 122.331C1001.44 131.924 994.962 145.017 992.888 161.61H1111.5ZM1186.63 179.888C1186.63 158.369 1191.04 139.313 1199.85 122.72C1208.93 106.127 1221.11 93.294 1236.41 84.2198C1251.96 74.8864 1269.07 70.2196 1287.74 70.2196C1304.59 70.2196 1319.24 73.59 1331.69 80.3309C1344.39 86.8124 1354.5 94.9792 1362.02 104.831V73.7197H1406.74V288H1362.02V256.111C1354.5 266.222 1344.26 274.648 1331.3 281.389C1318.33 288.13 1303.56 291.5 1286.96 291.5C1268.56 291.5 1251.7 286.833 1236.41 277.5C1221.11 267.907 1208.93 254.685 1199.85 237.833C1191.04 220.721 1186.63 201.406 1186.63 179.888ZM1362.02 180.665C1362.02 165.887 1358.91 153.054 1352.69 142.165C1346.72 131.276 1338.82 122.98 1328.96 117.276C1319.11 111.572 1308.48 108.72 1297.08 108.72C1285.67 108.72 1275.04 111.572 1265.19 117.276C1255.33 122.72 1247.3 130.887 1241.07 141.776C1235.11 152.406 1232.13 165.11 1232.13 179.888C1232.13 194.666 1235.11 207.629 1241.07 218.777C1247.3 229.925 1255.33 238.481 1265.19 244.444C1275.3 250.148 1285.93 253 1297.08 253C1308.48 253 1319.11 250.148 1328.96 244.444C1338.82 238.74 1346.72 230.444 1352.69 219.555C1358.91 208.406 1362.02 195.443 1362.02 180.665ZM1509.31 104.831C1515.79 93.9421 1524.34 85.5161 1534.97 79.5531C1545.86 73.3308 1558.7 70.2196 1573.48 70.2196V116.109H1562.2C1544.83 116.109 1531.6 120.517 1522.53 129.331C1513.72 138.146 1509.31 153.443 1509.31 175.221V288H1464.97V73.7197H1509.31V104.831ZM1722.34 70.2196C1739.19 70.2196 1754.23 73.7197 1767.45 80.7197C1780.93 87.7198 1791.43 98.0903 1798.95 111.831C1806.47 125.572 1810.23 142.165 1810.23 161.61V288H1766.28V168.221C1766.28 149.035 1761.49 134.387 1751.9 124.276C1742.3 113.905 1729.21 108.72 1712.62 108.72C1696.02 108.72 1682.8 113.905 1672.95 124.276C1663.36 134.387 1658.56 149.035 1658.56 168.221V288H1614.23V73.7197H1658.56V98.22C1665.82 89.405 1675.02 82.5346 1686.17 77.6086C1697.58 72.6826 1709.64 70.2196 1722.34 70.2196Z"
            ></path>
          </svg>
        </a>
      </div>
      <ul
        class="hidden items-center gap-1 rounded-full px-4 lg:flex bg-gray-200 bg-opacity-60 hover:bg-opacity-80 backdrop-blur text-gray-900"
        style={{ transform: "none", transformOrigin: "50% 50% 0px" }}
      >
        <a href="/">
          <li class="cursor-pointer select-none whitespace-nowrap rounded-full p-3 font-semibold transition duration-300 hover:text-blue-400">
            Home
          </li>
        </a>
        <a href="/work">
          <li class="cursor-pointer select-none whitespace-nowrap rounded-full p-3 font-semibold transition duration-300 hover:text-blue-400">
            About Us
          </li>
        </a>
        <a href="/poster">
          <li class="cursor-pointer select-none whitespace-nowrap rounded-full p-3 font-semibold transition duration-300 hover:text-blue-400">
            AI poster
          </li>
        </a>
        <a href="/community">
          <li class="cursor-pointer select-none whitespace-nowrap rounded-full p-3 font-semibold transition duration-300 hover:text-blue-400">
            Add Success Stories
          </li>
        </a>
        <a href="/lms">
          <li class="cursor-pointer select-none whitespace-nowrap rounded-full p-3 font-semibold transition duration-300 hover:text-blue-400">
            LMS
          </li>
        </a>
        <a href="/guidex">
          <li class="cursor-pointer select-none whitespace-nowrap rounded-full p-3 font-semibold transition duration-300 hover:text-blue-400">
            GuideX
          </li>
        </a>
      </ul>
      <div class="flex items-center gap-4">
        <div style={{ transform: "none", transformOrigin: "100% 50% 0px" }}>
          <div class="flex gap-3 ">
            <button
              // style={{position:"relative",right:"90px"}}
              type="button"
              class="bg-blue-500  inline-flex items-center whitespace-nowrap select-none justify-center font-medium gap-2 duration-200 ring-offset-background transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none rounded-lg disabled:opacity-50 disabled:grayscale bg-primary text-primary-foreground hover:bg-opacity-60 text-sm md:text-md px-5 md:px-7 py-2 md:py-3 shadow-lg"
            >
              Sign up
            </button>
            <button class="relative h-12 w-12 shrink-0 cursor-pointer select-none rounded-full p-2 transition-all duration-300 focus:outline-none lg:hidden bg-gray-50 bg-opacity-60 hover:bg-opacity-80 backdrop-blur text-gray-900">
              <span class="sr-only">open menu</span>
              <div class="absolute left-1/2 top-1/2 block w-5 -translate-x-1/2 -translate-y-1/3 transform">
                <span
                  aria-hidden="true"
                  class="absolute block h-0.5 w-5 transform bg-current transition duration-300 rounded-full ease-in-out -translate-y-[7px]"
                ></span>
                <span
                  aria-hidden="true"
                  class="absolute block h-0.5 w-5 transform bg-current transition duration-300 rounded-full ease-in-out"
                ></span>
                <span
                  aria-hidden="true"
                  class="absolute block h-0.5 w-5 transform bg-current transition duration-300 rounded-full ease-in-out translate-y-[7px]"
                ></span>
              </div>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
