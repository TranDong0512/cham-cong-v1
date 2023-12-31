import { combineReducers } from 'redux'
import { setUpCompanySlice } from './thiet_lap_cong_ty'
import { gh_ipSlice } from './gh_ip'
import { diagramSlice } from './diagram'
import { updateSlice } from './update'
import { ThoiGianDuyetReducer } from '@/components/cai-dat-de-xuat/reducer/reducer'
import { WhiteListSlice } from './white-list'
import { ThietLapCtReducer } from "@/components/thiet-lap-cong-ty/thiet-lap-ct-pb/reducer/reducer";
const rootReducer = combineReducers({
  setup: setUpCompanySlice.reducer,
  gh_ip: gh_ipSlice.reducer,
  diagram: diagramSlice.reducer,
  update: updateSlice.reducer,
  tgd: ThoiGianDuyetReducer.reducer,
  white_list: WhiteListSlice.reducer,
  tlct: ThietLapCtReducer.reducer,
})
export default rootReducer
