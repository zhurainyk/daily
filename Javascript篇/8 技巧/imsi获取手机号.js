function imsiToMobileAll() {
  const s130 = "^46001(\\d{3})(\\d)[0,1]\\d+";
  const s131 = "^46001(\\d{3})(\\d)9\\d+";
  const s132 = "^46001(\\d{3})(\\d)2\\d+";
  const s134 = "^460020(\\d)(\\d{3})\\d+";
  const s13x0 = "^46000(\\d{3})([5,6,7,8,9])\\d+";
  const s13x = "^46000(\\d{3})([0,1,2,3,4])(\\d)\\d+";
  const s150 = "^460023(\\d)(\\d{3})\\d+";
  const s151 = "^460021(\\d)(\\d{3})\\d+";
  const s152 = "^460022(\\d)(\\d{3})\\d+";
  const s155 = "^46001(\\d{3})(\\d)4\\d+";
  const s156 = "^46001(\\d{3})(\\d)3\\d+";
  const s157 = "^460077(\\d)(\\d{3})\\d+";
  const s158 = "^460028(\\d)(\\d{3})\\d+";
  const s159 = "^460029(\\d)(\\d{3})\\d+";
  const s147 = "^460079(\\d)(\\d{3})\\d+";
  const s185 = "^46001(\\d{3})(\\d)5\\d+";
  const s186 = "^46001(\\d{3})(\\d)6\\d+";
  const s187 = "^460027(\\d)(\\d{3})\\d+";
  const s188 = "^460078(\\d)(\\d{3})\\d+";
  const s1705 = "^460070(\\d)(\\d{3})\\d+";
  const s170x = "^46001(\\d{3})(\\d)8\\d+"; //
  const s178 = "^460075(\\d)(\\d{3})\\d+";
  const s145 = "^46001(\\d{3})(\\d)7\\d+";
  const s182 = "^460026(\\d)(\\d{3})\\d+";
  const s183 = "^460025(\\d)(\\d{3})\\d+";
  const s184 = "^460024(\\d)(\\d{3})\\d+";
  const s180 = "^46003(\\d)(\\d{3})7\\d+";
  const s153 = "^46003(\\d)(\\d{3})8\\d+";
  const s189 = "^46003(\\d)(\\d{3})9\\d+";

  const imsi = 46001123481234;
  const result = compile(s170x, imsi);
  if (result != null && result.length == 2) {
    return "170" + result[1] + result[0];
  }
}

function compile(reg, imsi) {
  const Reg = new RegExp(reg);
  const arr = Reg.match(imsi);
  return arr 
}


