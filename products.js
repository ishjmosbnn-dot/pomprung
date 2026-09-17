export const products = [
  {
    id: "pad-krapao",
    name: "ผัดกะเพราหมู",
    price: 69,
    category: "อาหารจานเดียว",
    emoji: "🍳",
    image: "/images/pad-krapao.svg",
    description: "กะเพราหมูสับหอมใบกะเพรา รสกลมกล่อม เสิร์ฟพร้อมข้าวสวยร้อนๆ",
  },
  {
    id: "tom-yum",
    name: "ต้มยำกุ้ง",
    price: 129,
    category: "ต้ม/แกง",
    emoji: "🍲",
    image: "/images/tom-yum.svg",
    description: "ต้มยำกุ้งรสจัดจ้าน เปรี้ยวเผ็ดหอมสมุนไพรไทย พร้อมกุ้งสด",
  },
  {
    id: "khao-man-gai",
    name: "ข้าวมันไก่",
    price: 59,
    category: "อาหารจานเดียว",
    emoji: "🍗",
    image: "/images/khao-man-gai.svg",
    description: "ไก่นุ่ม ข้าวมันหอม พร้อมน้ำจิ้มสูตรพิเศษของร้าน Pomprung",
  },
  {
    id: "pad-goong",
    name: "ข้าวผัดกุ้ง",
    price: 89,
    category: "อาหารจานเดียว",
    emoji: "🍤",
    image: "/images/pad-goong.svg",
    description: "ข้าวผัดกุ้งเม็ดร่วน หอมกระทะ ใส่กุ้งเนื้อเด้งและผักสด",
  },
  {
    id: "signature-platter",
    name: "ชุดพิเศษ Pomprung",
    price: 199,
    category: "เมนูพิเศษ",
    emoji: "🥘",
    image: "/images/signature-platter.svg",
    description: "ชุดเมนูซิกเนเจอร์สำหรับมื้อพิเศษ อิ่มคุ้มและเหมาะสำหรับแบ่งกัน",
  },
];

export function getProductById(id) {
  return products.find((product) => product.id === id);
}