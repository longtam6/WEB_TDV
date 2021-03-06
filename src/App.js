import Textfield from '@atlaskit/textfield'
import Select from '@atlaskit/select'
import TodoList from './components/TodoList';
import './App.css';
import React, { useInsertionEffect, useState } from 'react';
import clipboard from './Clipboard';




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
    "critrate": "Tỉ lệ bạo kích",
    "critdmg": "Sát thương bạo kích",
    "dmgvatli": "Tăng sát thương Vật Lý",
    "dmgnham": "Tăng sát thương Nham",
    "dmgphong": "Tăng sát thương nguyên tố Phong",
    "dmgbang": "Tăng sát thương nguyên tố Băng",
    "dmgloi": "Tăng sát thương nguyên tố Lôi",
    "dmghoa": "Tăng sát thương nguyên tố Hỏa",
	"dmgthuy": "Tăng sát thương nguyên tố Thủy"
  }

  function keyFromValue(obj, value) {
    return Object.keys(obj).find(key => obj[key] === value)[0];
  }

  const keyitem = (string) => string != "None" ? de_vn(string).replace(/ /g, "") : ""
  const de_stat_vn = (string) => string != "None" ? de_vn(string).replace(/ /g, "").replace(/\//g, "") : ""

  const type = () => typetdv

  function istats(arr, nvl, plc) {
    return Object.keys(arr).find(val => arr[val].value == nvl)
  }

  const keystat4 = () => stat4

  const keystat8 = () => stat8

  const keystat12 = () => stat12

  const keystat16 = () => stat16

  const keystat20 = () => stat20
 

  const keytdv = e => keyitem(nametdv).toLowerCase()

  const keystats1 = () => stats1

  const keystats2 = () => stats2
 
  const keystats3 = () => stats3

  const keystats4 = () => stats4

  const keystat = () => Object.keys(mainStats()).find(val => mainStats()[val].value == mainstats) ? mainstats : "<mainstat>"
 
  function statlist(astats) {
   
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
        return statlist(["em", "dmgvatli", "dmgnham", "dmgphong", "dmgbang", "dmgloi", "dmghoa", "dmgthuy", "def%", "atk%", "hp%"])
      case "mu":
        return statlist(["em", "heal%", "def%", "atk%", "hp%", "critdmg", "critrate"])
      default:
        return statlist([])
    }
  }

  const stat = () => {
    return statlist([
      "hp", "atk", "def", "em", "hp%", "def%", "atk%", "er", "critrate", "critdmg"
    ].filter(stat => stat !== mainstats));
  }

  const choicetree = (lvl) => {
    return Object.keys(lvl).map(key =>
      <div className='form-group' key={key}>
        <label className='statuptext'>Stats {key}</label>
        
        <Select className="al-select"
          onChange={e => lvl[key].onChange(e.value)}
          options={stat()}
        />
      </div>
    )
  }
  
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
              {}
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
              {}
              <Select className="al-select"
                
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
              {}
              <Select className="al-select"
               
                onChange={e => setNametdv(e.value)}
                options={
                  ["None", "Lửa Trắng Xám", "Ma Nữ", "Băng Dũng Sĩ", "Như Sấm", "Phiến Đá", "Tông Thất", "Tôn Giả", "Phù Hoa", "Hiền Nhân", "Dư Âm Tế Lễ", "Thiên Nham", "Sao Băng", "Bóng Hình", "Trầm Luân", "Đoàn Hát", "Bóng Hình", "Hồi Ức", "Giác Đấu Sĩ", "Dấu Ấn", "Lửa Trắng Xám", "Ma Nữ", "Băng Dũng Sỉ", "Như Sấm", "Phiến Đá", "Tông Thất", "Tôn Giả", "Phù Hoa", "Hiền Nhân", "Dư Âm Tế Lễ", "Thiên Nham", "Sao Băng", "Bóng Hình", "Trầm Luân", "Đoàn Hát", "Bóng Hình", "Xà Cừ", "Thần Sa", "Hồi Ức", "Giác Đấu Sĩ", "Dấu Ấn"]
                    .map((i, k) => ({ label: i, value: de_stat_vn(i) }))
                }
              />
            </div>
            <div className='form-group'>
              <label className='mainstattext'>Main Stat</label>
              {}
              <Select className={`al-select`}
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
			
	
            <button className='generator_button' onClick={e => (clipboard(command), alert("Đã sao chép"))}>
			
              Lười thế nhờ. Tự copy bằng tay đi bạn
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
