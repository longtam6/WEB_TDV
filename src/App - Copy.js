import Textfield from '@atlaskit/textfield'
import Select from '@atlaskit/select'
import TodoList from './components/TodoList';
import './App.css';
import React, { useInsertionEffect, useState } from 'react';
import clipboard from './Clipboard';


/*<h3>Command Thánh Di Vật</h3>
      <Textfield name = "uid" placeholder= "UID"></Textfield>
      <TodoList />*/
function App() {
  const [UID, setUID] = useState("");
  const [typetdv, setSelects] = useState("<Loại TDV>");
  const [mainstats, setStats] = useState("<Thông số chính>");
  const [stat4, setStat4] = useState("<stat+4>");
  const [stat8, setStat8] = useState("<stat+8>");
  const [stat12, setStat12] = useState("<stat+12>");
  const [stat16, setStat16] = useState("<stat+16>");
  const [stat20, setStat20] = useState("<stat+20>");
  const [nametdv, setNametdv] = useState("<Tên TDV>");
  const [stats1, setStats1] = useState("<stat1>");
  const [stats2, setStats2] = useState("<stat2>");
  const [stats3, setStats3] = useState("<stat3>");
  const [stats4, setStats4] = useState("<stat4>");

  function isInterger(value) {
    return !isNaN(Number(value))
  }

  // Big thanks to https://gist.github.com/hu2di/e80d99051529dbaa7252922baafd40e3
  const de_vn = (str) => {
    str = `${str}`
    str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
    str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
    str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
    str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
    str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
    str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
    str = str.replace(/đ/g, "d");
    str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, "A");
    str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, "E");
    str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, "I");
    str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, "O");
    str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, "U");
    str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, "Y");
    str = str.replace(/Đ/g, "D");
    return str;
  }
  const stats = {
    "hp": "HP",
    "hp%": "HP%",
    "atk": "ATK",
    "atk%": "ATK%",
    "def": "Phòng ngự",
    "def%": "DEF%",
    "er": "Hiệu quả nạp nguyên tố",
    "em": "Tinh thông nguyên tố",
	"heal%": "Tăng trị liệu",
    "CRITrate": "Tỉ lệ bạo kích",
    "CRITdmg": "Sát thương bạo kích",
    "DMGvatli": "Tăng sát thương Vật Lý",
    "DMGnham": "Tăng sát thương Nham",
    "DMGphong": "Tăng sát thương nguyên tố Phong",
    "DMGbang": "Tăng sát thương nguyên tố Băng",
    "DMGloi": "Tăng sát thương nguyên tố Lôi",
    "DMGhoa": "Tăng sát thương nguyên tố Hỏa",
	"DMGthuy": "Tăng sát thương nguyên tố Thủy"
  }

  function keyFromValue(obj, value) {
    return Object.keys(obj).find(key => obj[key] === value)[0];
  }

  const keyitem = (string) => string != "None" ? de_vn(string).replace(/ /g, "") : ""
  const de_stat_vn = (string) => string != "None" ? de_vn(string).replace(/ /g, "").replace(/\//g, "") : ""

  const type = () => typetdv
  // {
  //   if (typetdv === "lông") {
  //     return "long";
  //   } else if (typetdv === "đồng hồ") {
  //     return "dongho";
  //   } else if (typetdv === "ly") {
  //     return "ly";
  //   } else if (typetdv === "mũ") {
  //     return "mu";
  //   } else if (typetdv === "hoa") {
  //     return "hoa";
  //   } else if (!typetdv) {

  //   } else if (typetdv === "None") {

  //   }
  // } check discord tui phatr

  function istats(arr, nvl, plc) {
    return Object.keys(arr).find(val => arr[val].value == nvl)
  }

  const keystat4 = () => stat4
  // {
  //   if (stat4 === "Tinh thông nguyên tố") {
  //     return "em";
  //   } else if (stat4 === "Phòng ngự") {
  //     return "def";
  //   } else if (stat4 === "Hiệu quả nạp nguyên tố") {
  //     return "er";
  //   } else if (stat4 === "Tỉ lệ bạo kích") {
  //     return "CRITRate";
  //   } else if (stat4 === "Sát thương bạo kích") {
  //     return "CRITDmg";
  //   } else if (!stat4) {

  //   } else if (stat4 === "None") {

  //   } else {
  //     return stat4
  //   }
  // }
  const keystat8 = () => stat8
  // {
  //   if (stat8 === "Tinh thông nguyên tố") {
  //     return "em";
  //   } else if (stat8 === "Phòng ngự") {
  //     return "def";
  //   } else if (stat8 === "Hiệu quả nạp nguyên tố") {
  //     return "er";
  //   } else if (stat8 === "Tỉ lệ bạo kích") {
  //     return "CRITRate";
  //   } else if (stat8 === "Sát thương bạo kích") {
  //     return "CRITDmg";
  //   } else if (!stat8) {

  //   } else if (stat8 === "None") {

  //   } else {
  //     return stat8
  //   }
  // }
  const keystat12 = () => stat12
  // {
  //   if (stat12 === "Tinh thông nguyên tố") {
  //     return "em";
  //   } else if (stat12 === "Phòng ngự") {
  //     return "def";
  //   } else if (stat12 === "Hiệu quả nạp nguyên tố") {
  //     return "er";
  //   } else if (stat12 === "Tỉ lệ bạo kích") {
  //     return "CRITRate";
  //   } else if (stat12 === "Sát thương bạo kích") {
  //     return "CRITDmg";
  //   } else if (!stat12) {

  //   } else if (stat12 === "None") {

  //   } else {
  //     return stat12
  //   }
  // }
  const keystat16 = () => stat16
  // {
  //   if (stat16 === "Tinh thông nguyên tố") {
  //     return "em";
  //   } else if (stat16 === "Phòng ngự") {
  //     return "def";
  //   } else if (stat16 === "Hiệu quả nạp nguyên tố") {
  //     return "er";
  //   } else if (stat16 === "Tỉ lệ bạo kích") {
  //     return "CRITRate";
  //   } else if (stat16 === "Sát thương bạo kích") {
  //     return "CRITDmg";
  //   } else if (!stat16) {

  //   } else if (stat16 === "None") {

  //   } else {
  //     return stat16
  //   }
  // }
  const keystat20 = () => stat20
  // {
  //   if (stat20 === "Tinh thông nguyên tố") {
  //     return "em";
  //   } else if (stat20 === "Phòng ngự") {
  //     return "def";
  //   } else if (stat20 === "Hiệu quả nạp nguyên tố") {
  //     return "er";
  //   } else if (stat20 === "Tỉ lệ bạo kích") {
  //     return "CRITRate";
  //   } else if (stat20 === "Sát thương bạo kích") {
  //     return "CRITDmg";
  //   } else if (!stat20) {

  //   } else if (stat20 === "None") {

  //   } else {
  //     return stat20
  //   }
  // }

  const keytdv = e => keyitem(nametdv).toLowerCase()
  // const keytdv = () => {
  //   if (nametdv === "Như Sấm") {
  //     return "nhusam";
  //   } else if (nametdv === "Lửa Trắng Xám") {
  //     return "luatrangxam";
  //   } else if (nametdv === "Ma Nữ") {
  //     return "manu";
  //   } else if (nametdv === "Băng Dũng Sỉ") {
  //     return "bangdungsi";
  //   } else if (nametdv === "Phiến Đá") {
  //     return "phienda";
  //   } else if (nametdv === "Tông Thất") {
  //     return "tongthat";
  //   } else if (nametdv === "Trầm Luân") {
  //     return "tramluan";
  //   } else if (nametdv === "Đoàn Hát") {
  //     return "doanhat";
  //   } else if (nametdv === "Bóng Hình") {
  //     return "bonghinh";
  //   } else if (nametdv === "Hồi Ức") {
  //     return "hoiuc";
  //   } else if (nametdv === "Giác Đấu Sĩ") {
  //     return "giacdausi";
  //   } else if (nametdv === "Dấu Ấn") {
  //     return "dauan";
  //   } else if (nametdv === "Tôn Giả") {
  //     return "tongia"
  //   } else if (nametdv === "Phù Hoa") {
  //     return "phuhoa";
  //   } else if (nametdv === "Hiền Nhân") {
  //     return "hiennhan";
  //   } else if (nametdv === "Dư Âm Tế Lễ") {
  //     return "duamtele";
  //   } else if (nametdv === "Thiên Nham") {
  //     return "thiennham";
  //   } else if (nametdv === "Sao Băng") {
  //     return "saobang";
  //   } else if (nametdv === "Xà Cừ") {
  //     return "xacu";
  //   } else if (nametdv === "Thần Sa") {
  //     return "thansa";
  
  //   }

  // }
  const keystats1 = () => stats1
  // {
  //   if (stats1 === "Tinh thông nguyên tố") {
  //     return "em";
  //   } else if (stats1 === "Phòng ngự") {
  //     return "def";
  //   } else if (stats1 === "Hiệu quả nạp nguyên tố") {
  //     return "er";
  //   } else if (stats1 === "Tỉ lệ bạo kích") {
  //     return "CRITRate";
  //   } else if (stats1 === "Sát thương bạo kích") {
  //     return "CRITDmg";
  //   } else if (!stats1) {

  //   } else if (stats1 === "None") {

  //   } else {
  //     return stats1
  //   }
  // }
  const keystats2 = () => stats2
  // {
  //   if (stats2 === "Tinh thông nguyên tố") {
  //     return "em";
  //   } else if (stats2 === "Phòng ngự") {
  //     return "def";
  //   } else if (stats2 === "Hiệu quả nạp nguyên tố") {
  //     return "er";
  //   } else if (stats2 === "Tỉ lệ bạo kích") {
  //     return "CRITRate";
  //   } else if (stats2 === "Sát thương bạo kích") {
  //     return "CRITDmg";
  //   } else if (!stats2) {

  //   } else if (stats2 === "None") {

  //   } else {
  //     return stats2
  //   }
  // }
  const keystats3 = () => stats3
  // {
  //   if (stats3 === "Tinh thông nguyên tố") {
  //     return "em";
  //   } else if (stats3 === "Phòng ngự") {
  //     return "def";
  //   } else if (stats3 === "Hiệu quả nạp nguyên tố") {
  //     return "er";
  //   } else if (stats3 === "Tỉ lệ bạo kích") {
  //     return "CRITRate";
  //   } else if (stats3 === "Sát thương bạo kích") {
  //     return "CRITDmg";
  //   } else if (!stats3) {

  //   } else if (stats3 === "None") {

  //   } else {
  //     return stats3
  //   }
  // }
  const keystats4 = () => stats4
  // {
  //   if (stats4 === "Tinh thông nguyên tố") {
  //     return "em";
  //   } else if (stats4 === "Phòng ngự") {
  //     return "def";
  //   } else if (stats4 === "Hiệu quả nạp nguyên tố") {
  //     return "er";
  //   } else if (stats4 === "Tỉ lệ bạo kích") {
  //     return "CRITRate";
  //   } else if (stats4 === "Sát thương bạo kích") {
  //     return "CRITDmg";
  //   } else if (!stats4) {

  //   } else if (stats4 === "None") {

  //   } else {
  //     return stats4
  //   }
  // }
  const keystat = () => Object.keys(mainStats()).find(val => mainStats()[val].value == mainstats) ? mainstats : "<mainstat>"
  // {
  //   if (mainstats === "Tinh thông nguyên tố") {
  //     return "em";
  //   } else if (mainstats === "Tỉ lệ bạo kích") {
  //     return "CRITRate";
  //   } else if (mainstats === "Sát thương bạo kích") {
  //     return "CRITDmg";
  //   } else if (mainstats === "Tăng sát thương Vật Lí") {
  //     return "DMGvatli";
  //   } else if (mainstats === "Tăng sát thương nguyên tố Nham") {
  //     return "DMGnham";
  //   } else if (mainstats === "Tăng sát thương nguyên tố Phong") {
  //     return "DMGphong";
  //   } else if (mainstats === "Tăng sát thương nguyên tố Băng") {
  //     return "DMGbang";
  //   } else if (mainstats === "Tăng sát thương nguyên tố Lôi") {
  //     return "DMGloi";
  //   } else if (mainstats === "Tăng sát thương nguyên tố Thủy") {
  //     return "DMGthuy";
  //   } else if (mainstats === "Tăng sát thương nguyên tố Hỏa") {
  //     return "DMGhoa";
  //   }
  //   else if (!mainstats) {

  //   } else if (mainstats === "None") {

  //   } else {
  //     return mainstats
  //   }
  // }

  function statlist(astats) {
    // return astats.map((stat, index) => <option value={stat} key={index}>{stats[stat]}</option>)
    return astats.map((stat, index) => ({ label: stats[stat], value: stat }))
  }

  const mainStats = () => {
    switch (typetdv) {
      case "hoa":
        return statlist(["hp"])
      case "long":
        return statlist(["atk"])
      case "dongho":
        return statlist(["em", "er", "def%", "atk%", "hp%"])
      case "ly":
        return statlist(["em", "DMGvatli", "DMGnham", "DMGphong", "DMGbang", "DMGloi", "DMGhoa", "DMGthuy", "def%", "atk%", "hp%"])
      case "mu":
        return statlist(["em", "heal%", "def%", "atk%", "hp%", "CRITdmg", "CRITrate"])
      default:
        return statlist([])
    }
  }

  const stat = () => {
    return statlist([
      "hp", "atk", "def", "em", "hp%", "def%", "atk%", "er", "CRITrate", "CRITdmg"
    ].filter(stat => stat !== mainstats));
  }

  const choicetree = (lvl) => {
    return Object.keys(lvl).map(key =>
      <div className='form-group' key={key}>
        <label className='statuptext'>Stats {key}</label>
        {/* <select className='statup' value={lvl[key].value} onChange={lvl[key].onChange}>
          <option>None</option>
          {}
        </select> */}
        <Select className="al-select"
          onChange={e => lvl[key].onChange(e.value)}
          options={stat()}
        />
      </div>
    )
  }
  //<p>!tdv {UID} {typetdv} {keytdv()} {keystat()} {keystat4()} {keystat8()} {keystat12()} {keystat16()} {keystat20()}</p>
  //background-image: url(https://cdn.discordapp.com/attachments/970652938550775858/970709233727332413/1123014.jpg);
  const command = <p>!tdv {UID ? UID : "<UID>"} {type()} {keytdv()} {keystat()} {keystats1()} {keystats2()} {keystats3()} {keystats4()} {keystat4()} {keystat8()} {keystat12()} {keystat16()} {keystat20()}</p>


  return (
    <>
      <div className='App'>
      
        <div className='container'>
          <div className='generator'>
            <div className='generator_header'>
              <h2>Command Thánh Di Vật</h2>
            </div>
            <div className='generator_command'>
              {command}
            </div>
            <div className='form-group'>
              {/* <input
                value={UID} onChange={e => setUID((isInterger(e.target.value) && e.target.value.length < 10) || e.target.value === "" ? e.target.value : UID)}
                className='uid'
                type="text"
                id="UID"
                name="UID"
              /> */}
              <Textfield value={UID}
                onChange={e => setUID((isInterger(e.target.value) && e.target.value.length < 10) || e.target.value === "" ? e.target.value : UID)}
                className='uid al-select'
                type="text"
                id="UID"
                name="UID"
                placeholder="UID"
              />
            </div>
            <div className='form-group'>
              <label className='typetdvtext'>Loại Thánh Di Vật</label>
              {/* <select className='typetdv' value={typetdv} onChange={e => setSelects(e.target.value)}>

              </select> */}
              <Select className="al-select"
                // value={typetdv}
                onChange={e => setSelects(e.value)}
                options={
                  ["hoa", "lông", "ly", "đồng hồ", "mũ"].map((i, k) => ({
                    label: i,
                    value: de_stat_vn(i)
                  }))
                }
              />
            </div>
            <div className='form-group'>
              <label className='tdvtext' >Tên Thánh Di Vật</label>
              {/* <select className='tdv' value={nametdv} onChange={e => setNametdv(e.target.value)} >

              </select> */}
              <Select className="al-select"
                // value={nametdv}
                onChange={e => setNametdv(e.value)}
                options={
                  ["None", "Lửa Trắng Xám", "Ma Nữ", "Băng Dũng Sĩ", "Như Sấm", "Phiến Đá", "Tông Thất", "Tôn Giả", "Phù Hoa", "Hiền Nhân", "Dư Âm Tế Lễ", "Thiên Nham", "Sao Băng", "Bóng Hình", "Trầm Luân", "Đoàn Hát", "Bóng Hình", "Hồi Ức", "Giác Đấu Sĩ", "Dấu Ấn", "Lửa Trắng Xám", "Ma Nữ", "Băng Dũng Sỉ", "Như Sấm", "Phiến Đá", "Tông Thất", "Tôn Giả", "Phù Hoa", "Hiền Nhân", "Dư Âm Tế Lễ", "Thiên Nham", "Sao Băng", "Bóng Hình", "Trầm Luân", "Đoàn Hát", "Bóng Hình", "Xà Cừ", "Thần Sa", "Hồi Ức", "Giác Đấu Sĩ", "Dấu Ấn"]
                    .map((i, k) => ({ label: i, value: de_stat_vn(i) }))
                }
              />
            </div>
            <div className='form-group'>
              <label className='mainstattext'>Main Stat</label>
              {/* <select className='mainstat' value={mainstats} onChange={e => setStats(e.target.value)}>
                <option>None</option>
                {}
              </select> */}
              <Select className={`al-select`}
                // value={mainstats}
                onChange={e => (setStats(e.value))}
                options={mainStats()} />
            </div>
            {
              choicetree({
                1: {
                  value: stats1,
                  onChange: setStats1
                },
                2: {
                  value: stats2,
                  onChange: setStats2
                },
                3: {
                  value: stats3,
                  onChange: setStats3
                },
                4: {
                  value: stats4,
                  onChange: setStats4
                },
                "+4": {
                  value: stat4,
                  onChange: setStat4
                },
                "+8": {
                  value: stat8,
                  onChange: setStat8
                },
                "+12": {
                  value: stat12,
                  onChange: setStat12
                },
                "+16": {
                  value: stat16,
                  onChange: setStat16
                },
                "+20": {
                  value: stat20,
                  onChange: setStat20
                }
              })
            }
            <button className='generator_button' onClick={e => (clipboard(command),alert("Đã sao chép"))}>
              Sao chép
            </button>
          </div>
        </div>
        <div className= 'credit'>
          
          <dev className= 'bg'> 
            
            <div className='facebook'>
              <img src= "https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Facebook_Logo_%282019%29.png/1200px-Facebook_Logo_%282019%29.png" alt="Facebook" className="faceicon"></img>
              <a href="https://www.facebook.com/groups/2586229915017915" sizes= "20x20"><p className="facebookurl">Genshin Impact Leak 2VN</p></a>
            </div>
            <div className='facebook'>
              <img src= "https://www.svgrepo.com/show/331368/discord-v2.svg" alt="Discord" className="discordicon"></img>
              <a href="https://discord.gg/uyMmgTDtKE" sizes= "20x20"><p className="facebookurl">Discord Link</p></a>
            </div>
            <div className='by'>
              <p>Được thực hiện bởi: ||Tao Bị Thiểu Năng||#0295 và hUwUtao#2803</p>
            </div>
          </dev>
          
          <img src="https://images-ext-1.discordapp.net/external/QmtFW_Z5VikzGQLhwApIHlAOxDNyhnAxjTmMzASR0-I/%3Fsize%3D4096/https/cdn.discordapp.com/icons/969393714432716871/d373b0ea11fa8dfe836f8c67450a5c6c.png" alt="Avatar"></img>
          
            
        </div>
      </div>


    </>

  );
}

export default App;
