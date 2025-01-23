import {
  AiOutlineAppstore,
  AiOutlineClockCircle,
  AiOutlineWifi
} from 'react-icons/ai'
import { BsFillLightbulbFill, BsKeyboard } from 'react-icons/bs'
import {
  FaGamepad,
  FaHdd,
  FaMemory,
  FaMicrochip,
  FaPalette,
  FaTrademark,
  FaTv,
  FaWeightHanging
} from 'react-icons/fa'
import { FiBox, FiTarget } from 'react-icons/fi'
import { IoMdApps } from 'react-icons/io'
import { IoHardwareChipSharp } from 'react-icons/io5'
import { RiBatteryChargeLine } from 'react-icons/ri'

export const featureIcons = {
  hl_ram: FaMemory,
  hl_cpu: FaMicrochip,
  hl_ssd: FaHdd,
  hl_hz: FaTv,
  hl_vga: FaGamepad,
  hl_lcd: FaTv,

  // warranty: AiOutlineClockCircle, // Warranty: 24 months
  spec_Kết_nối: AiOutlineWifi, // Connectivity: Bluetooth, Wireless
  filter_LED: BsFillLightbulbFill, // LED: RGB
  filter_Loại_sản_phẩm: FaGamepad, // Product Type: Gaming
  spec_Thương_hiệu: FaTrademark, // Brand: Cooler Master
  spec_Độ_phân_giải: FiTarget, // DPI Resolution: 19000
  spec_Số_nút_bấm: IoMdApps, // Number of Buttons: 6
  spec_Trọng_lượng: FaWeightHanging, // Weight: 58 g
  spec_Công_nghệ_cảm_biến: FaMicrochip, // Sensor Technology: PixArt

  // warranty_product: AiOutlineClockCircle, // Same as warranty
  hl_led: BsFillLightbulbFill, // Highlight LED: RGB or DPI
  filter_Pin: RiBatteryChargeLine, // Battery type: Rechargeable
  filter_Màu_sắc: FaPalette, // Color: White
  filter_Kết_nối: AiOutlineWifi, // Connectivity: Wireless
  hl_connect: AiOutlineWifi, // Highlight Connectivity: Wireless
  hl_pin: RiBatteryChargeLine, // Highlight Battery: Rechargeable
  hl_led_DPI: FiTarget, // DPI specification highlight

  spec_LED: BsFillLightbulbFill, // LED: RGB
  spec_Bảo_hành: AiOutlineClockCircle, // Warranty: 12 months
  spec_Pin: RiBatteryChargeLine, // Battery capacity: 3000mAh
  spec_Hotswap: IoHardwareChipSharp, // Hotswap: 5 pin TTC socket
  spec_Keycaps: FaPalette, // Keycaps: PBT
  filter_Keycap: FaPalette, // Keycap filter: PBT
  hl_keycap: FaPalette, // Highlighted Keycap: PBT
  spec_Layout: BsKeyboard, // Keyboard layout: Fullsize
  spec_Kích_thước: FiBox, // Dimensions: 440x132x41mm
  spec_Tương_thích: AiOutlineAppstore, // Compatibility: Windows / MacOS / Linux
  hl_size: FiBox // Highlighted size: Mini
}
