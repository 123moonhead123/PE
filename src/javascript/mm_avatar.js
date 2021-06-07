macros.update_mm_avatar = {
    handler: function(place, macroName, params, parser) {
        var mm_avatar_container = document.getElementById('mm_avatar_container')
        if (mm_avatar_container){
            window.mm_avatar.process_mm_avatar_update();
        }
        else {
            window.mm_avatar.init_mm_avatar();
        }
    }
};

window.mm_avatar = {
    process_mm_avatar_update: function() {
        var imgPath = "Images/mmavatar/";
        var imgBase = "";
        var shoeOverlay = false;
        var hoseUnderlay = false;
        window.mm_avatar.mm_avatar_structure.forEach(element => {
            switch(element.st_name){
                case "base":
                    var boobs = State.active.variables.body.boobs.level;
                    var ass = State.active.variables.body.ass.level;
                    var imgName = imgPath + "Base_B" + boobs + "A" + ass + ".png";
                    imgBase = "Base_B" + boobs + "A" + ass + "/";
                    document.getElementById(element.st_id).src = imgName;
                    break;
                case "face":
                    var lips = State.active.variables.body.lips.level;
                    var makeup = State.active.variables.body.makeup.level;
                    var imgName = imgPath + "Face/Base M" + makeup + "L" + lips + ".png";
                    document.getElementById(element.st_id).src = imgName;
                    break;
                case "hair":
                    var hairPrefix = "";
                    var hairSuffix = "";
                    switch(State.active.variables.body.hairstyle.level){
                        case 0: //Need to add in male hair, using same hair style for short and male now
                        case 1:
                            hairPrefix = "hair_short_";
                            break;
                        case 2:
                            hairPrefix = "hair_medium_";
                            break;
                        case 3:
                            hairPrefix = "hair_long_";
                            break;
                        case 4:
                            hairPrefix = "hair_tails_";
                            break;
                        case 5:
                            hairPrefix = "hair_curly_";
                            break;
                        default:
                            hairPrefix = "hair_short_";
                    }
                    switch(State.active.variables.body.hairColor){
                        case 0:
                            hairSuffix = "black.png";
                            break;
                        case 1:
                            hairSuffix = "brown.png";
                            break;
                        case 2:
                            hairSuffix = "red.png";
                            break;
                        case 3:
                            hairSuffix = "blonde.png";
                            break;
                        case 4:
                            hairSuffix = "silver.png";
                            break;
                        case 5:
                            hairSuffix = "pink.png";
                            break;
                        default:
                            hairSuffix = "brown.png";
                    }
                    var imgName = imgPath + "Hair/" + hairPrefix + hairSuffix;
                    document.getElementById(element.st_id).src = imgName;
                    break;
                case "penis":
                    var penisSize = State.active.variables.body.penisShrink.level;
                    var chastity = window.wardrobeFuncs.isItemMasterWearing("chastity") ? "C" : "P";
                    var imgName = imgPath + "Penis/" + chastity + penisSize + ".png";
                    document.getElementById(element.st_id).src = imgName;
                    break;
                case "underwear":
                case "outerwear":
                case "nightwear":
                case "maid":
                    var hidePenis = false;
                    var imgEl = document.getElementById(element.st_id);
                    var underwear = window.wardrobeFuncs.getWornItem("underwear");
                    var outerwear = window.wardrobeFuncs.getWornItem("outerwear");
                    var nightwear = window.wardrobeFuncs.getWornItem("nightwear");
                    var maid = window.wardrobeFuncs.getWornItem("maid");
                    
                    //hide penis image when wearing pants or underwear, keep it visible without underwear and skirts/dresses
                    hidePenis = underwear || (outerwear && outerwear.isMale) || (outerwear && outerwear.tags.shorts) || (outerwear && !(outerwear.isFemale)) || nightwear || maid ? true : false;
                    if(hidePenis){
                        document.getElementById("mm_avatar_img_penis").style.display = "none";
                    }
                    else{
                        document.getElementById("mm_avatar_img_penis").style.display = "initial";
                    }

                    switch(element.st_name){
                        case "underwear":
                            var wearing = underwear;
                            break;
                        case "outerwear":
                            var wearing = outerwear;
                            break;
                        case "nightwear":
                            var wearing = nightwear;
                            break;
                        case "maid":
                          var wearing = maid;
                          break;
                        default:
                    }
                    var imgName = imgPath + imgBase + element.st_name + "/";
                    var defaultImg = imgName;
                    if(wearing){
                        imgName = imgName + wearing.masterItem + "/" + wearing.variant + ".png"
                        defaultImg = defaultImg + wearing.masterItem + "/" + wearing.variant.substring(0, wearing.variant.length - 2) + "05.png"
                        if(imgEl){
                            imgEl.src = imgName;
                            imgEl.setAttribute("onerror", "this.onerror=null;this.src='" + defaultImg + "'");
                        }
                    }
                    else {
                        if(imgEl){
                            imgEl.removeAttribute("src");
                            imgEl.removeAttribute("onerror");
                        }
                    }
                    break;
                default:
                    switch(element.st_name){
                        case "bra":
                            var wearing =  window.wardrobeFuncs.getWornItem("bra");
                            break;
                        case "hosiery":
                            var wearing =  window.wardrobeFuncs.getWornItem("hosiery");
                            if(wearing && this.mm_avatar_socks.some(x => x.variant == wearing.variant)) {hoseUnderlay = true}
                            break;
                        case "shoes":
                            var wearing = window.wardrobeFuncs.getWornItem("shoes");
                            if(wearing && this.mm_avatar_shoes.some(x => x.shoeName == wearing.variant)) {shoeOverlay = true}
                            break;
                        default:
                    }
                    var imgEl = document.getElementById(element.st_id);
                    var imgName = imgPath + imgBase + element.st_name + "/";
                    var defaultImg = imgName;
                    if(wearing){
                        imgName = imgName + wearing.masterItem + "/" + wearing.variant + ".png"
                        defaultImg = defaultImg + wearing.masterItem + "/" + wearing.variant.substring(0, wearing.variant.length - 2) + "05.png"
                        if(imgEl){
                            imgEl.src = imgName;
                            imgEl.setAttribute("onerror", "this.onerror=null;this.src='" + defaultImg + "'");
                        }
                        if(shoeOverlay && hoseUnderlay){
                          var hosiery = window.wardrobeFuncs.getWornItem("hosiery");
                          var shoes = window.wardrobeFuncs.getWornItem("shoes");
                          var shoeOverlay = this.mm_avatar_socks.find(({variant}) => variant == hosiery.variant);
                          imgName = imgPath + imgBase + element.st_name + "/" + shoes.masterItem + "/" + shoes.variant + "/" + shoeOverlay.shoeOverlay + ".png";
                          defaultImg = imgPath + imgBase + element.st_name + "/" + shoes.masterItem + "/" + wearing.variant.substring(0, wearing.variant.length - 2) + "05/" + shoeOverlay.shoeOverlay + ".png";
                          var shoeImgEl = document.getElementById("mm_avatar_img_shoes");
                          if(imgEl){
                            imgEl.src = imgName;
                            imgEl.setAttribute("onerror", "this.onerror=null;this.src='" + defaultImg + "'");
                          }
                        }
                    }
                    else {
                        if(imgEl){
                            imgEl.removeAttribute("src");
                            imgEl.removeAttribute("onerror");
                        }
                    }
                    break;
            }
        })
    },

    init_mm_avatar: function(){
        var avContainer = document.createElement('div');
        avContainer.className = "mm_avatar_container";
        avContainer.id = "mm_avatar_container";

        window.mm_avatar.mm_avatar_structure.forEach(element => {
            var avImgDiv = document.createElement('div');
    
            avImgDiv.className = "mm_avatar_imgdiv";
            avImgDiv.style.zIndex = element.zindex;

            var avImg = document.createElement('img');
            avImg.className = "mm_avatar_img";
            avImg.id = element.st_id;

            avImgDiv.appendChild(avImg);        
            avContainer.appendChild(avImgDiv);
        });

        var sidebar_mmavatar = document.getElementById("sidebar_mmavatar");
        sidebar_mmavatar.appendChild(avContainer);
        window.mm_avatar.process_mm_avatar_update();
        this.init = true;
    },

    mm_avatar_structure: [
        {
            "st_name": "base",
            "st_id": "mm_avatar_img_base",
            "zindex": 100
        },
        {
            "st_name": "face",
            "st_id": "mm_avatar_img_face",
            "zindex": 110
        },
        {
            "st_name": "penis",
            "st_id": "mm_avatar_img_penis",
            "zindex": 120
        },
        {
            "st_name": "bra",
            "st_id": "mm_avatar_img_bra",
            "zindex": 130
        },
        {
            "st_name": "underwear",
            "st_id": "mm_avatar_img_panties",
            "zindex": 140
        },
        {
            "st_name": "hosiery",
            "st_id": "mm_avatar_img_socks",
            "zindex": 150
        },
        {
            "st_name": "shoes",
            "st_id": "mm_avatar_img_shoes",
            "zindex": 160
        },
        {
            "st_name": "outerwear",
            "st_id": "mm_avatar_img_clothes",
            "zindex": 170
        },
        {
            "st_name": "nightwear",
            "st_id": "mm_avatar_img_nightwear",
            "zindex": 180
        },
        {
          "st_name": "maid",
          "st_id": "mm_avatar_img_maid",
          "zindex": 190
        },
        {
            "st_name": "hair",
            "st_id": "mm_avatar_img_hair",
            "zindex": 200
        }
    ],

    mm_avatar_socks: [
        {
          "variant": "socks_00",
          "curAlt": 0,
          "sockType": "socks",
          "shoeOverlay": "blackSocks"
        },
        {
          "variant": "socks_01",
          "curAlt": 1,
          "sockType": "socks",
          "shoeOverlay": "blackSocks"
        },
        {
          "variant": "socks_02",
          "curAlt": 2,
          "sockType": "socks",
          "shoeOverlay": "whiteSocks"
        },
        {
          "variant": "socks_03",
          "curAlt": 3,
          "sockType": "socks",
          "shoeOverlay": "whiteSocks"
        },
        {
          "variant": "socks_04",
          "curAlt": 4,
          "sockType": "socks",
          "shoeOverlay": "blackSocks"
        },
        {
          "variant": "socks_05",
          "curAlt": 5,
          "sockType": "socks",
          "shoeOverlay": "whiteSocks"
        },
        {
          "variant": "socks_06",
          "curAlt": 6,
          "sockType": "socks",
          "shoeOverlay": "greySocks"
        },
        {
          "variant": "socks_07",
          "curAlt": 7,
          "sockType": "socks",
          "shoeOverlay": "greySocks"
        },
        {
          "variant": "socks_08",
          "curAlt": 8,
          "sockType": "socks",
          "shoeOverlay": "greySocks"
        },
        {
          "variant": "socks_09",
          "curAlt": 9,
          "sockType": "socks",
          "shoeOverlay": "greySocks"
        },
        {
          "variant": "socks_10",
          "curAlt": 10,
          "sockType": "socks",
          "shoeOverlay": "greySocks"
        },
        {
          "variant": "socks_11",
          "curAlt": 11,
          "sockType": "socks",
          "shoeOverlay": "whiteStockings"
        },
        {
          "variant": "socks_12",
          "curAlt": 12,
          "sockType": "socks",
          "shoeOverlay": "whiteSocks"
        },
        {
          "variant": "socks_13",
          "curAlt": 13,
          "sockType": "socks",
          "shoeOverlay": "whiteSocks"
        },
        {
          "variant": "socks_14",
          "curAlt": 14,
          "sockType": "socks",
          "shoeOverlay": "whiteSocks"
        },
        {
          "variant": "socks_15",
          "curAlt": 15,
          "sockType": "socks",
          "shoeOverlay": "greySocks"
        },
        {
          "variant": "socks_16",
          "curAlt": 16,
          "sockType": "socks",
          "shoeOverlay": "whiteSocks"
        },
        {
          "variant": "socks_17",
          "curAlt": 17,
          "sockType": "socks",
          "shoeOverlay": "whiteStockings"
        },
        {
          "variant": "socks_18",
          "curAlt": 18,
          "sockType": "socks",
          "shoeOverlay": "whiteSocks"
        },
        {
          "variant": "socks_19",
          "curAlt": 19,
          "sockType": "socks",
          "shoeOverlay": "blackSocks"
        },
        {
          "variant": "socks_20",
          "curAlt": 20,
          "sockType": "socks",
          "shoeOverlay": "blackSocks"
        },
        {
          "variant": "socks_21",
          "curAlt": 21,
          "sockType": "socks",
          "shoeOverlay": "whiteSocks"
        },
        {
          "variant": "socks_22",
          "curAlt": 22,
          "sockType": "socks",
          "shoeOverlay": "greySocks"
        },
        {
          "variant": "socks_23",
          "curAlt": 23,
          "sockType": "socks",
          "shoeOverlay": "whiteSocks"
        },
        {
          "variant": "socks_24",
          "curAlt": 24,
          "sockType": "socks",
          "shoeOverlay": "whiteSocks"
        },
        {
          "variant": "socks_25",
          "curAlt": 25,
          "sockType": "socks",
          "shoeOverlay": "whiteSocks"
        },
        {
          "variant": "socks_26",
          "curAlt": 26,
          "sockType": "socks",
          "shoeOverlay": "blackSocks"
        },
        {
          "variant": "socks_43",
          "curAlt": 43,
          "sockType": "socks",
          "shoeOverlay": "whiteSocks"
        },
        {
          "variant": "stockings_00",
          "curAlt": 0,
          "sockType": "stockings",
          "shoeOverlay": "blackStockings"
        },
        {
          "variant": "stockings_01",
          "curAlt": 1,
          "sockType": "stockings",
          "shoeOverlay": "blackStockings"
        },
        {
          "variant": "stockings_02",
          "curAlt": 2,
          "sockType": "stockings",
          "shoeOverlay": "blackStockings"
        },
        {
          "variant": "stockings_03",
          "curAlt": 3,
          "sockType": "stockings",
          "shoeOverlay": "blackStockings"
        },
        {
          "variant": "stockings_04",
          "curAlt": 4,
          "sockType": "stockings",
          "shoeOverlay": "blackStockings"
        },
        {
          "variant": "stockings_05",
          "curAlt": 5,
          "sockType": "stockings",
          "shoeOverlay": "blackStockings"
        },
        {
          "variant": "stockings_06",
          "curAlt": 6,
          "sockType": "stockings",
          "shoeOverlay": "whiteStockings"
        },
        {
          "variant": "stockings_07",
          "curAlt": 7,
          "sockType": "stockings",
          "shoeOverlay": "whiteStockings"
        },
        {
          "variant": "stockings_08",
          "curAlt": 8,
          "sockType": "stockings",
          "shoeOverlay": "whiteStockings"
        },
        {
          "variant": "stockings_09",
          "curAlt": 9,
          "sockType": "stockings",
          "shoeOverlay": "whiteStockings"
        },
        {
          "variant": "stockings_10",
          "curAlt": 10,
          "sockType": "stockings",
          "shoeOverlay": "whiteStockings"
        },
        {
          "variant": "stockings_11",
          "curAlt": 11,
          "sockType": "stockings",
          "shoeOverlay": "whiteStockings"
        },
        {
          "variant": "stockings_12",
          "curAlt": 12,
          "sockType": "stockings",
          "shoeOverlay": "whiteStockings"
        },
        {
          "variant": "stockings_13",
          "curAlt": 13,
          "sockType": "stockings",
          "shoeOverlay": "blackStockings"
        },
        {
          "variant": "stockings_14",
          "curAlt": 14,
          "sockType": "stockings",
          "shoeOverlay": "blackStockings"
        },
        {
          "variant": "stockings_15",
          "curAlt": 15,
          "sockType": "stockings",
          "shoeOverlay": "blackStockings"
        },
        {
          "variant": "stockings_16",
          "curAlt": 16,
          "sockType": "stockings",
          "shoeOverlay": "blackStockings"
        },
        {
          "variant": "stockings_17",
          "curAlt": 17,
          "sockType": "stockings",
          "shoeOverlay": "whiteStockings"
        },
        {
          "variant": "stockings_18",
          "curAlt": 18,
          "sockType": "stockings",
          "shoeOverlay": "blackStockings"
        },
        {
          "variant": "stockings_19",
          "curAlt": 19,
          "sockType": "stockings",
          "shoeOverlay": "whiteStockings"
        },
        {
          "variant": "stockings_20",
          "curAlt": 20,
          "sockType": "stockings",
          "shoeOverlay": "blackStockings"
        },
        {
          "variant": "stockings_21",
          "curAlt": 21,
          "sockType": "stockings",
          "shoeOverlay": "blackStockings"
        },
        {
          "variant": "stockings_22",
          "curAlt": 22,
          "sockType": "stockings",
          "shoeOverlay": "whiteStockings"
        },
        {
          "variant": "stockings_23",
          "curAlt": 23,
          "sockType": "stockings",
          "shoeOverlay": "fishnet"
        },
        {
          "variant": "stockings_24",
          "curAlt": 24,
          "sockType": "stockings",
          "shoeOverlay": "blackStockings"
        },
        {
          "variant": "stockings_25",
          "curAlt": 25,
          "sockType": "stockings",
          "shoeOverlay": "blackStockings"
        },
        {
          "variant": "stockings_26",
          "curAlt": 26,
          "sockType": "stockings",
          "shoeOverlay": "fishnet"
        },
        {
          "variant": "stockings_27",
          "curAlt": 27,
          "sockType": "stockings",
          "shoeOverlay": "fishnet"
        },
        {
          "variant": "stockings_28",
          "curAlt": 28,
          "sockType": "stockings",
          "shoeOverlay": "fishnet"
        },
        {
          "variant": "stockings_39",
          "curAlt": 39,
          "sockType": "stockings",
          "shoeOverlay": "blackStockings"
        },
        {
          "variant": "stockings_40",
          "curAlt": 40,
          "sockType": "stockings",
          "shoeOverlay": "blackStockings"
        },
        {
          "variant": "stockings_62",
          "curAlt": 62,
          "sockType": "stockings",
          "shoeOverlay": "whiteStockings"
        },
        {
          "variant": "stockings_74",
          "curAlt": 74,
          "sockType": "stockings",
          "shoeOverlay": "whiteStockings"
        },
        {
          "variant": "stockings_latex_00",
          "curAlt": 0,
          "sockType": "stockings_latex",
          "shoeOverlay": "blackLatex"
        },
        {
          "variant": "stockings_latex_01",
          "curAlt": 1,
          "sockType": "stockings_latex",
          "shoeOverlay": "blackLatex"
        },
        {
          "variant": "stockings_latex_02",
          "curAlt": 2,
          "sockType": "stockings_latex",
          "shoeOverlay": "blackLatex"
        },
        {
          "variant": "stockings_latex_03",
          "curAlt": 3,
          "sockType": "stockings_latex",
          "shoeOverlay": "blackLatex"
        }
    ],

    mm_avatar_shoes: [
        {
          "shoeName": "boots_heeled_09",
          "curAlt": 9,
          "shoeType": "boots_heeled",
          "sockOverlay": true
        },
        {
          "shoeName": "boots_heeled_16",
          "curAlt": 16,
          "shoeType": "boots_heeled",
          "sockOverlay": true
        },
        {
          "shoeName": "boots_heeled_17",
          "curAlt": 17,
          "shoeType": "boots_heeled",
          "sockOverlay": true
        },
        {
          "shoeName": "flats_10",
          "curAlt": 10,
          "shoeType": "flats",
          "sockOverlay": true
        },
        {
          "shoeName": "flats_20",
          "curAlt": 20,
          "shoeType": "flats",
          "sockOverlay": true
        },
        {
          "shoeName": "heels_00",
          "curAlt": 0,
          "shoeType": "heels",
          "sockOverlay": true
        },
        {
          "shoeName": "heels_01",
          "curAlt": 1,
          "shoeType": "heels",
          "sockOverlay": true
        },
        {
          "shoeName": "heels_02",
          "curAlt": 2,
          "shoeType": "heels",
          "sockOverlay": true
        },
        {
          "shoeName": "heels_03",
          "curAlt": 3,
          "shoeType": "heels",
          "sockOverlay": true
        },
        {
          "shoeName": "heels_04",
          "curAlt": 4,
          "shoeType": "heels",
          "sockOverlay": true
        },
        {
          "shoeName": "heels_05",
          "curAlt": 5,
          "shoeType": "heels",
          "sockOverlay": true
        },
        {
          "shoeName": "heels_06",
          "curAlt": 6,
          "shoeType": "heels",
          "sockOverlay": true
        },
        {
          "shoeName": "heels_07",
          "curAlt": 7,
          "shoeType": "heels",
          "sockOverlay": true
        },
        {
          "shoeName": "heels_08",
          "curAlt": 8,
          "shoeType": "heels",
          "sockOverlay": true
        },
        {
          "shoeName": "heels_09",
          "curAlt": 9,
          "shoeType": "heels",
          "sockOverlay": true
        },
        {
          "shoeName": "heels_10",
          "curAlt": 10,
          "shoeType": "heels",
          "sockOverlay": true
        },
        {
          "shoeName": "heels_11",
          "curAlt": 11,
          "shoeType": "heels",
          "sockOverlay": true
        },
        {
          "shoeName": "heels_12",
          "curAlt": 12,
          "shoeType": "heels",
          "sockOverlay": true
        },
        {
          "shoeName": "heels_13",
          "curAlt": 13,
          "shoeType": "heels",
          "sockOverlay": true
        },
        {
          "shoeName": "heels_14",
          "curAlt": 14,
          "shoeType": "heels",
          "sockOverlay": true
        },
        {
          "shoeName": "heels_15",
          "curAlt": 15,
          "shoeType": "heels",
          "sockOverlay": true
        },
        {
          "shoeName": "heels_16",
          "curAlt": 16,
          "shoeType": "heels",
          "sockOverlay": true
        },
        {
          "shoeName": "heels_17",
          "curAlt": 17,
          "shoeType": "heels",
          "sockOverlay": true
        },
        {
          "shoeName": "heels_18",
          "curAlt": 18,
          "shoeType": "heels",
          "sockOverlay": true
        },
        {
          "shoeName": "heels_19",
          "curAlt": 19,
          "shoeType": "heels",
          "sockOverlay": true
        },
        {
          "shoeName": "heels_39",
          "curAlt": 39,
          "shoeType": "heels",
          "sockOverlay": true
        },
        {
          "shoeName": "heels_40",
          "curAlt": 40,
          "shoeType": "heels",
          "sockOverlay": true
        },
        {
          "shoeName": "heels_71",
          "curAlt": 71,
          "shoeType": "heels",
          "sockOverlay": true
        },
        {
          "shoeName": "heels_73",
          "curAlt": 73,
          "shoeType": "heels",
          "sockOverlay": true
        },
        {
          "shoeName": "heels_stripper_00",
          "curAlt": 0,
          "shoeType": "heels_stripper",
          "sockOverlay": true
        },
        {
          "shoeName": "heels_stripper_01",
          "curAlt": 1,
          "shoeType": "heels_stripper",
          "sockOverlay": true
        },
        {
          "shoeName": "heels_stripper_02",
          "curAlt": 2,
          "shoeType": "heels_stripper",
          "sockOverlay": true
        },
        {
          "shoeName": "heels_stripper_03",
          "curAlt": 3,
          "shoeType": "heels_stripper",
          "sockOverlay": true
        },
        {
          "shoeName": "heels_stripper_04",
          "curAlt": 4,
          "shoeType": "heels_stripper",
          "sockOverlay": true
        },
        {
          "shoeName": "heels_stripper_05",
          "curAlt": 5,
          "shoeType": "heels_stripper",
          "sockOverlay": true
        },
        {
          "shoeName": "heels_stripper_06",
          "curAlt": 6,
          "shoeType": "heels_stripper",
          "sockOverlay": true
        },
        {
          "shoeName": "heels_stripper_07",
          "curAlt": 7,
          "shoeType": "heels_stripper",
          "sockOverlay": true
        },
        {
          "shoeName": "heels_stripper_08",
          "curAlt": 8,
          "shoeType": "heels_stripper",
          "sockOverlay": true
        },
        {
          "shoeName": "heels_stripper_09",
          "curAlt": 9,
          "shoeType": "heels_stripper",
          "sockOverlay": true
        },
        {
          "shoeName": "heels_stripper_10",
          "curAlt": 10,
          "shoeType": "heels_stripper",
          "sockOverlay": true
        },
        {
          "shoeName": "heels_stripper_11",
          "curAlt": 11,
          "shoeType": "heels_stripper",
          "sockOverlay": true
        },
        {
          "shoeName": "heels_stripper_12",
          "curAlt": 12,
          "shoeType": "heels_stripper",
          "sockOverlay": true
        },
        {
          "shoeName": "heels_stripper_13",
          "curAlt": 13,
          "shoeType": "heels_stripper",
          "sockOverlay": true
        },
        {
          "shoeName": "heels_stripper_14",
          "curAlt": 14,
          "shoeType": "heels_stripper",
          "sockOverlay": true
        },
        {
          "shoeName": "heels_stripper_15",
          "curAlt": 15,
          "shoeType": "heels_stripper",
          "sockOverlay": true
        },
        {
          "shoeName": "heels_stripper_16",
          "curAlt": 16,
          "shoeType": "heels_stripper",
          "sockOverlay": true
        },
        {
          "shoeName": "heels_stripper_17",
          "curAlt": 17,
          "shoeType": "heels_stripper",
          "sockOverlay": true
        },
        {
          "shoeName": "heels_stripper_39",
          "curAlt": 39,
          "shoeType": "heels_stripper",
          "sockOverlay": true
        }
    ],

    init: false
}