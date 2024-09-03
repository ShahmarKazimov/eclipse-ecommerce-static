import seaDweller from "./assets/seaDweller.png"
import dayDate from "./assets/dayDate.png"
import yachtMaster from "./assets/yatchMaster.png"
import milgauss from "./assets/milgaus.png"
import lady from "./assets/lady.png"
import yaster from "./assets/yaster.png"
import panthere from "./assets/panthere.png"
import pasha from "./assets/pasha.png"
import ballon from "./assets/ballon.png"
import baignore from "./assets/baignoire.png"
import tortue from "./assets/tortue.png"
import rotonde from "./assets/ratonde.png"
import king from "./assets/king.png"
import spirit from "./assets/spirit.png"
import classic from "./assets/classic.png"
import ferrari from "./assets/ferrari.png"
import unico from "./assets/unico.png"
import fusion from "./assets/fusion.png"
import ventura from "./assets/ventura.png"
import broad from "./assets/broad.png"
import jazz from "./assets/jazz.png"
import intra from "./assets/intra.png"
import khaki from "./assets/khaki.png"
import valiant from "./assets/valiant.png"
import diver from "./assets/diver.png"
import micky from "./assets/micky.png"
import quadrato from "./assets/quadrato.png"
import sanmarco from "./assets/sanmarco.png"
import classico from "./assets/classico.png"
import dualtime from "./assets/dualtime.png"


export const getProducts = async () => {
	return httpClient.get('/products').then(r => r.data);
}

const myData = [
    {
        id: 1,
        title: "Rolex Sea-Dweller",
        price: 9610,
        category: "Men",
        description: "For sale: Rolex Serial 44mm #116660. Excellent condition with box, papers, tags, diver extension. RSC serviced.",
        productPic: seaDweller,
        sku: "seaDweller",
        coverCase: "Steel",
        waterProof: "No"
    },
    {
        id: 2,
        title: "Rolex Day-Date 40",
        price: 45250,
        category: "Women",
        description: "For sale: Rolex Serial 40mm #228238. Excellent condition with box, papers, tags, diver extension. RSC serviced.",
        productPic: dayDate,
        sku: "dayDate",
        coverCase: "Gold",
        waterProof: "Yes"
    },
    {
        id: 3,
        title: "Rolex Yacht-Master II",
        price: 19495,
        category: "Men",
        description: "For sale: Rolex Serial 44mm #116680. Excellent condition with box, papers, tags, diver extension. RSC serviced.",
        productPic: yachtMaster,
        sku: "yachtMaster",
        coverCase: "Steel",
        waterProof: "No"
    },
    {
        id: 4,
        title: "Rolex Milgauss",
        price: 11577,
        category: "Men",
        description: "For sale: Rolex Serial 40mm #116400GV. Excellent condition with box, papers, tags, diver extension. RSC serviced.",
        productPic: milgauss,
        sku: "milgauss",
        coverCase: "Steel",
        waterProof: "No"
    },
    {
        id: 5,
        title: "Rolex Lady-Datejust",
        price: 3562,
        category: "Women",
        description: "For sale: Rolex Serial 44mm #69173. Excellent condition with box, papers, tags, diver extension. RSC serviced.",
        productPic: lady,
        sku: "lady",
        coverCase: "Gold",
        waterProof: "Yes"
    },
    {
        id: 6,
        title: "Rolex Yacht-Master 40",
        price: 31502,
        category: "Men",
        description: "For sale: Rolex Serial 40mm #126655. Excellent condition with box, papers, tags, diver extension. RSC serviced.",
        productPic: yaster,
        sku: "yaster",
        coverCase: "Gold",
        waterProof: "Yes"
    },
    {
        id: 7,
        title: "Cartier Panthère",
        price: 7795,
        category: "Women",
        description: "For sale: Cartier Serial 30mm #W2PN0006. Excellent condition with box, papers, tags, diver extension. RSC serviced.",
        productPic: panthere,
        sku: "panthere",
        coverCase: "Silver",
        waterProof: "Yes"
    },
    {
        id: 8,
        title: "Cartier Pasha",
        price: 4000,
        category: "Men",
        description: "For sale: Cartier Serial 42mm #W31072M7. Excellent condition with box, papers, tags, diver extension. RSC serviced.",
        productPic: pasha,
        sku: "pasha",
        coverCase: "Steel",
        waterProof: "Yes"
    },
    {
        id: 9,
        title: "Cartier Ballon Bleu",
        price: 8995,
        category: "Men",
        description: "For sale: Cartier Serial 44mm #W6920002. Excellent condition with box, papers, tags, diver extension. RSC serviced.",
        productPic: ballon,
        sku: "ballon",
        coverCase: "Steel",
        waterProof: "No"
    },
    {
        id: 10,
        title: "Cartier Baignoire",
        price: 6455,
        category: "Women",
        description: "For sale: Cartier Serial 31mm #1955. Excellent condition with box, papers, tags, diver extension. RSC serviced.",
        productPic: baignore,
        sku: "baignore",
        coverCase: "Steel",
        waterProof: "No"
    },
    {
        id: 11,
        title: "Cartier Tortue",
        price: 14576,
        category: "Men",
        description: "For sale: Cartier Serial 40mm #W1556233. Excellent condition with box, papers, tags, diver extension. RSC serviced.",
        productPic: tortue,
        sku: "tortue",
        coverCase: "Steel",
        waterProof: "Yes"
    },
    {
        id: 12,
        title: "Cartier de Rotonde",
        price: 5200,
        category: "Men",
        description: "For sale: Cartier Serial 42mm #W1556368. Excellent condition with box, papers, tags, diver extension. RSC serviced.",
        productPic: rotonde,
        sku: "rotonde",
        coverCase: "Steel",
        waterProof: "Yes"
    },
    {
        id: 13,
        title: "Hublot King Power",
        price: 48500,
        category: "Men",
        description: "For sale: Hublot Serial 48mm #W6920002. Excellent condition with box, papers, tags, diver extension. RSC serviced.",
        productPic: king,
        sku: "king",
        coverCase: "Gold",
        waterProof: "Yes"
    },
    {
        id: 14,
        title: "Hublot Spirit",
        price: 17289,
        category: "Men",
        description: "For sale: Hublot Serial 48mm #W6920002. Excellent condition with box, papers, tags, diver extension. RSC serviced.",
        productPic: spirit,
        sku: "spirit",
        coverCase: "Titanium",
        waterProof: "Yes"
    },
    {
        id: 15,
        title: "Hublot Classic",
        price: 3447,
        category: "Men",
        description: "For sale: Hublot Serial 36mm #JQFZ70. Excellent condition with box, papers, tags, diver extension. RSC serviced.",
        productPic: classic,
        sku: "classic",
        coverCase: "Steel",
        waterProof: "No"
    },
    {
        id: 16,
        title: "Hublot Ferrari",
        price: 16557,
        category: "Men",
        description: "For sale: Hublot Serial 45mm #K14NT9. Excellent condition with box, papers, tags, diver extension. RSC serviced.",
        productPic: ferrari,
        sku: "ferrari",
        coverCase: "Titanium",
        waterProof: "Yes"
    },
    {
        id: 17,
        title: "Hublot Unico",
        price: 9499,
        category: "Men",
        description: "For sale: Hublot Serial 45mm #W6920002. Excellent condition with box, papers, tags, diver extension. RSC serviced.",
        productPic: unico,
        sku: "unico",
        coverCase: "Titanium",
        waterProof: "Yes"
    },
    {
        id: 18,
        title: "Hublot Fusion",
        price: 8450,
        category: "Men",
        description: "For sale: Hublot Serial 45mm #W6920002. Excellent condition with box, papers, tags, diver extension. RSC serviced.",
        productPic: fusion,
        sku: "fusion",
        coverCase: "Ceramic",
        waterProof: "No"
    },
    {
        id: 19,
        title: "Hamilton Ventura",
        price: 1855,
        category: "Men",
        description: "For sale: Hamilton Serial 44mm #H245352. Excellent condition with box, papers, tags, diver extension. RSC serviced.",
        productPic: ventura,
        sku: "ventura",
        coverCase: "Steel",
        waterProof: "No"
    },
    {
        id: 20,
        title: "Hamilton Broadway",
        price: 559,
        category: "Men",
        description: "For sale: Hamilton Serial 40mm #H43311135. Excellent condition with box, papers, tags, diver extension. RSC serviced.",
        productPic: broad,
        sku: "broad",
        coverCase: "Steel",
        waterProof: "No"
    },
    {
        id: 21,
        title: "Hamilton Jazzmaster",
        price: 549,
        category: "Men",
        description: "For sale: Hamilton Serial 40mm #H32505141. Excellent condition with box, papers, tags, diver extension. RSC serviced.",
        productPic: jazz,
        sku: "jazz",
        coverCase: "Steel",
        waterProof: "No"
    },
    {
        id: 22,
        title: "Hamilton Intra-Matic",
        price: 700,
        category: "Men",
        description: "For sale: Hamilton Serial 40mm #H38425720. Excellent condition with box, papers, tags, diver extension. RSC serviced.",
        productPic: intra,
        sku: "intra",
        coverCase: "Steel",
        waterProof: "No"
    },
    {
        id: 23,
        title: "Hamilton Khaki",
        price: 650,
        category: "Men",
        description: "For sale: Hamilton Serial 43mm #H77715553. Excellent condition with box, papers, tags, diver extension. RSC serviced.",
        productPic: khaki,
        sku: "khaki",
        coverCase: "Steel",
        waterProof: "Yes"
    },
    {
        id: 24,
        title: "Hamilton Valiant",
        price: 590,
        category: "Men",
        description: "For sale: Hamilton Serial 40mm #H39515754. Excellent condition with box, papers, tags, diver extension. RSC serviced.",
        productPic: valiant,
        sku: "valiant",
        coverCase: "Steel",
        waterProof: "No"
    },
    {
        id: 25,
        title: "Ulysse Nardin Diver",
        price: 4954,
        category: "Men",
        description: "For sale: Ulysse Nardin Serial 42mm #263-33. Excellent condition with box, papers, tags, diver extension. RSC serviced.",
        productPic: diver,
        sku: "diver",
        coverCase: "Gold",
        waterProof: "Yes"
    },
    {
        id: 26,
        title: "Ulysse Nardin Michelangelo",
        price: 3000,
        category: "Women",
        description: "For sale: Ulysse Nardin Serial 38mm #223-68. Excellent condition with box, papers, tags, diver extension. RSC serviced.",
        productPic: micky,
        sku: "micky",
        coverCase: "Steel",
        waterProof: "Yes"
    },
    {
        id: 27,
        title: "Ulysse Nardin Quadrato",
        price: 4799,
        category: "Men",
        description: "For sale: Ulysse Nardin Serial 42mm #243-92. Excellent condition with box, papers, tags, diver extension. RSC serviced.",
        productPic: quadrato,
        sku: "quadrato",
        coverCase: "Silver",
        waterProof: "Yes"
    },
    {
        id: 28,
        title: "Ulysse Nardin San Marco",
        price: 3104,
        category: "Men",
        description: "For sale: Ulysse Nardin Serial 40mm #223-88. Excellent condition with box, papers, tags, diver extension. RSC serviced.",
        productPic: sanmarco,
        sku: "sanmarco",
        coverCase: "Steel",
        waterProof: "No"
    },
    {
        id: 29,
        title: "Ulysse Nardin Classico",
        price: 19891,
        category: "Men",
        description: "For sale: Ulysse Nardin Serial 40mm #223-88. Excellent condition with box, papers, tags, diver extension. RSC serviced.",
        productPic: classico,
        sku: "classico",
        coverCase: "Steel",
        waterProof: "Yes"
    },
    {
        id: 30,
        title: "Ulysse Nardin Dual Time",
        price: 4688,
        category: "Men",
        description: "For sale: Ulysse Nardin Serial 40mm #223-88. Excellent condition with box, papers, tags, diver extension. RSC serviced.",
        productPic: dualtime,
        sku: "dualtime  ",
        coverCase: "Gold",
        waterProof: "Yes"
    }
];

export default myData;
