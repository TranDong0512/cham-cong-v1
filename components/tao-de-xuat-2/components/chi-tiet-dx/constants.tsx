import { getCurrentToken } from '@/pages/api/BaseApi'
import { Button } from 'antd'
import dayjs from 'dayjs'
import jwtDecode from 'jwt-decode'
import _ from 'lodash'
import moment from 'moment'

export const LIST_DX = {
  3: 'Đơn xin tạm ứng',
  9: 'Đề xuất tham gia dự án',
  7: 'Đề xuất bổ nhiệm',
  20: 'Đề xuất hoa hồng doanh thu',
  2: 'Đề xuất xin đổi ca',
  4: 'Đơn xin cấp phát tài sản',
  5: 'Đơn xin thôi việc',
  6: 'Đơn xin tăng lương',
  12: 'Đề xuất xin sử dụng phòng họp',
  16: 'Đề xuất khiếu nại',
  15: 'Đề xuất thanh toán',
  19: '',
  1: 'Đề xuất đơn xin nghỉ phép',
  8: 'Đề xuất luân chuyển công tác',
  17: 'Đề xuất cộng công',
  14: 'Đề xuất sửa chữa cơ sở vật chất',
  13: 'Đề xuất đăng ký sử dụng xe công',
  10: 'Đề xuất tăng ca',
  11: 'Đề xuất nghỉ thai sản',
  18: 'Đề xuất lịch làm việc',
  21: 'Đề xuất xin đi muộn về sớm',
  0: 'Đề xuất xin nghỉ ra ngoài',
}

/* 
    data dang nhu sau: 
   name: LIST_DX?.[input?.nhom_de_xuat],
    dxInfo: {},
    commonInfo: {},
    duyetInf: {
      leaderDuyet: [],
      monitorDuyet: [],
      dxState: [],
    },

*/
export const renderInfoDx = (input, setOpen) => {
  const curToken = getCurrentToken()
  let decodedToken
  const listUserDuyet = input?.lanh_dao_duyet || []
  const listUserTheodoi = input?.nguoi_theo_doi || []
  if (curToken) {
    decodedToken = jwtDecode(curToken)
  }

  const timeDiff = moment().diff(moment.unix(input?.thoi_gian_tao), 'days')

  const renderName = () => {
    if (input?.nhom_de_xuat === 19) {
      return input?.thong_tin_chung?.thuong_phat?.type_tp
        ? 'Đề xuất cộng tiền'
        : 'Đề xuất trừ tiền'
    }
    if (input?.nhom_de_xuat === 1) {
      if (input?.thong_tin_chung?.nhap_ngay_nhan_luong?.ngay_nhan_luong) {
        return 'Đề xuất ngày nhận lương'
      }
      if (input?.thong_tin_chung?.xin_tai_tai_lieu?.ten_tai_lieu) {
        return 'Đề xuất xin tải tài liệu'
      } else {
        return LIST_DX?.[input?.nhom_de_xuat]
      }
    } else {
      return LIST_DX?.[input?.nhom_de_xuat]
    }
  }

  const dataObj = {
    name: renderName(),
    dxInfo: {},
    commonInfo: {},
    duyetInf: {
      leaderDuyet: listUserDuyet
        ? listUserDuyet?.map((item) => ({
            name: item?.userName,
            id: item?.idQLC,
            avatar: `https://cdn.timviec365.vn/upload/employee/${item?.avatarUser}`,
          }))
        : [],
      monitorDuyet: listUserTheodoi
        ? listUserTheodoi?.map((item) => ({
            name: item?.userName,
            id: item?.idQLC,
            avatar: `https://cdn.timviec365.vn/upload/employee/${item?.avatarUser}`,
          }))
        : [],
      //   type :1: gửi, 2: tiếp nhận, 3: duyệt
      dxState: [
        {
          time:
            input?.thoi_gian_tao && input?.thoi_gian_tao.toString().length > 10
              ? moment
                  .unix(moment(input?.thoi_gian_tao).unix())
                  .format('HH:mm A DD/MM/YYYY')
              : moment.unix(input?.thoi_gian_tao).format('HH:mm A DD/MM/YYYY'),
          name: input?.nguoi_tao,
          action: 'vừa tạo đề xuất',
          type: '1',
        },
        {
          time:
            input?.thoi_gian_tiep_nhan !== 0 &&
            moment(input?.thoi_gian_tiep_nhan).format('hh:mm A DD/MM/YYYY'),
          name: listUserDuyet?.[0]?.userName,
          action: 'vừa tiếp nhận đề xuất',
          type: '2',
        },
        {
          time:
            input?.thoi_gian_duyet !== 0 &&
            moment(input?.thoi_gian_duyet).format('hh:mm A DD/MM/YYYY'),
          name: listUserDuyet?.[0]?.userName,
          action: 'vừa duyệt đề xuất',
          type: '3',
        },
      ],
    },
    admin: !_.isEmpty(
      listUserDuyet?.find((item) => item?.idQLC === decodedToken?.data?.idQLC)
    ),
    type: input?.type_duyet,
    overtime: input?.qua_han_duyet,
  }
  console.log(input)

  if (input) {
    switch (input?.nhom_de_xuat) {
      // đề xuất xin nghỉ ra ngoài

      case 3:
        dataObj.dxInfo = {
          'Người tạo': {
            value: input?.nguoi_tao,
          },
          'Nhóm đề xuất': {
            value: 'Đơn tạm ứng',
            color: '#4C5BD4',
          },
          'Thời gian tạo': {
            value:
              input?.thoi_gian_tao &&
              input?.thoi_gian_tao.toString().length > 10
                ? moment
                    .unix(moment(input?.thoi_gian_tao).unix())
                    .format('HH:mm A DD/MM/YYYY')
                : moment
                    .unix(input?.thoi_gian_tao)
                    .format('HH:mm A DD/MM/YYYY'),
          },
          'Cập nhật': {
            value: `${moment().diff(
              input?.thoi_gian_tao.toString().length > 10
                ? moment.unix(moment(input?.thoi_gian_tao).unix())
                : moment.unix(input?.thoi_gian_tao),
              'days'
            )} ngày trước`,
          },
        }

        //Thong tin chung
        dataObj.commonInfo = {
          'Họ và tên': {
            value: input?.nguoi_tao,
            color: '#4C5BD4',
          },
          'Số tiền tạm ứng': {
            value:
              input?.thong_tin_chung?.tam_ung?.sotien_tam_ung || 0 + ' VNĐ',
          },
          'Ngày tạm ứng': {
            value:
              input?.thong_tin_chung?.tam_ung?.ngay_tam_ung &&
              input?.thong_tin_chung?.tam_ung?.ngay_tam_ung.toString().length >
                10
                ? moment
                    .unix(
                      moment(
                        input?.thong_tin_chung?.tam_ung?.ngay_tam_ung
                      ).unix()
                    )
                    .format('DD-MM-YYYY')
                : moment
                    .unix(input?.thong_tin_chung?.tam_ung?.ngay_tam_ung)
                    .format('DD-MM-YYYY'),
          },
          'Lý do tạm ứng': {
            value: input?.thong_tin_chung?.tam_ung?.ly_do,
          },
        }

        return dataObj
      case 9:
        dataObj.dxInfo = {
          'Người tạo': {
            value: input?.nguoi_tao,
          },
          'Nhóm đề xuất': {
            value: 'Đề xuất tham gia dự án',
            color: '#4C5BD4',
          },
          'Thời gian tạo': {
            value:
              input?.thoi_gian_tao &&
              moment
                .unix(moment(input?.thoi_gian_tao).unix())
                .format('HH:mm A DD/MM/YYYY'),
          },
          'Cập nhật': {
            value: `${moment().diff(
              moment.unix(moment(input?.thoi_gian_tao).unix()),
              'days'
            )} ngày trước`,
          },
        }
        //Thong tin chung
        dataObj.commonInfo = {
          'Họ và tên': {
            value: input?.nguoi_tao,
            color: '#4C5BD4',
          },
          'Phòng ban': {
            value: 'Phòng 1' || '',
            more: {
              'Chức vụ': {
                value: 'Nhân viên chính thức' || '',
              },
            },
          },
          'Dự án đề xuất tham gia': {
            value: input?.thong_tin_chung?.tham_gia_du_an?.dx_da,
          },
          'Lý do đề xuất tham gia dự án': {
            value: input?.thong_tin_chung?.tham_gia_du_an?.ly_do,
          },
        }
        return dataObj
      case 7:
        dataObj.dxInfo = {
          'Người tạo': {
            value: input?.nguoi_tao,
          },
          'Nhóm đề xuất': {
            value: 'Đề xuất tham gia bổ nhiệm',
            color: '#4C5BD4',
          },
          'Thời gian tạo': {
            value:
              input?.thoi_gian_tao &&
              moment
                .unix(moment(input?.thoi_gian_tao).unix())
                .format('HH:mm A DD/MM/YYYY'),
          },
          'Cập nhật': {
            value: `${moment().diff(
              moment.unix(moment(input?.thoi_gian_tao).unix()),
              'days'
            )} ngày trước`,
          },
        }
        //Thong tin chung
        dataObj.commonInfo = {
          'Họ và tên': {
            value: input?.nguoi_tao,
            color: '#4C5BD4',
          },
          'Thành viên được bổ nhiệm': {
            value: input?.thong_tin_chung?.bo_nhiem?.thanhviendc_bn || '',
            more: {
              'Phòng ban': {
                value: input?.thong_tin_chung?.bo_nhiem?.chucvu_hientai || '',
              },
              'Chức vụ hiện tại': {
                value: input?.thong_tin_chung?.bo_nhiem?.name_ph_bn || '',
              },
            },
          },
          'Chức vụ đề xuất bổ nhiệm': {
            value: input?.thong_tin_chung?.bo_nhiem?.chucvu_dx_bn || '',
            more: {
              'Phòng ban mới': {
                value: input?.thong_tin_chung?.bo_nhiem?.phong_ban_moi || '',
              },
            },
          },
          'Lý do đề xuất bổ nhiệm': {
            value: input?.thong_tin_chung?.bo_nhiem?.ly_do,
          },
        }
        return dataObj
      case 20:
        dataObj.dxInfo = {
          'Người tạo': {
            value: input?.nguoi_tao,
          },
          'Nhóm đề xuất': {
            value: 'Đề xuất hoa hồng doanh thu',
            color: '#4C5BD4',
          },
          'Thời gian tạo': {
            value:
              input?.thoi_gian_tao &&
              moment
                .unix(moment(input?.thoi_gian_tao).unix())
                .format('HH:mm A DD/MM/YYYY'),
          },
          'Cập nhật': {
            value: `${moment().diff(
              moment.unix(moment(input?.thoi_gian_tao).unix()),
              'days'
            )} ngày trước`,
          },
        }
        //Thong tin chung
        dataObj.commonInfo = {
          'Họ và tên': {
            value: input?.nguoi_tao,
            color: '#4C5BD4',
          },
          'Ngày tháng': {
            value:
              'Tháng ' +
                moment(input?.thong_tin_chung?.hoa_hong?.tim_hh).format(
                  'MM YYYY'
                ) || '',
          },
          'Số tiền doanh thu theo thời điểm': {
            value: input?.thong_tin_chung?.hoa_hong?.dt_money + ' VNĐ' || '',
            color: '#70BE28',
          },
          'Ngày áp dụng': {
            value: moment(input?.thong_tin_chung?.hoa_hong?.tim_hh).format(
              'DD-MM-YYYY'
            ),
          },
          'Tổng doanh thu': {
            value: input?.thong_tin_chung?.hoa_hong?.dt_money + ' VNĐ' || '',
            color: '#70BE28',
          },
          'Mức doanh thu': {
            value: input?.thong_tin_chung?.hoa_hong?.dt_money + ' VNĐ' || '',
          },
          'Lý do đề xuất hoa hồng doanh thu': {
            value: input?.thong_tin_chung?.hoa_hong?.ly_do || '',
          },
        }
        return dataObj
      case 2:
        dataObj.dxInfo = {
          'Người tạo': {
            value: input?.nguoi_tao,
          },
          'Nhóm đề xuất': {
            value: 'Đơn xin đổi ca',
            color: '#4C5BD4',
          },
          'Thời gian tạo': {
            value:
              input?.thoi_gian_tao &&
              input?.thoi_gian_tao.toString().length > 10
                ? moment
                    .unix(moment(input?.thoi_gian_tao).unix())
                    .format('HH:mm A DD/MM/YYYY')
                : moment
                    .unix(input?.thoi_gian_tao)
                    .format('HH:mm A DD/MM/YYYY'),
          },
          'Cập nhật': {
            value: `${moment().diff(
              input?.thoi_gian_tao.toString().length > 10
                ? moment.unix(moment(input?.thoi_gian_tao).unix())
                : moment.unix(input?.thoi_gian_tao),
              'days'
            )} ngày trước`,
          },
        }
        dataObj.commonInfo = {
          'Họ và tên': {
            value: input?.nguoi_tao,
            color: '#4C5BD4',
          },
          'Lịch đổi ca': {
            value: '',
            more: {
              'Ngày đổi': {
                value:
                  input?.thong_tin_chung?.doi_ca?.ngay_muon_doi.toString()
                    .length > 10
                    ? moment
                        .unix(
                          moment(
                            input?.thong_tin_chung?.doi_ca?.ngay_muon_doi
                          ).unix()
                        )
                        .format('DD-MM-YYYY')
                    : moment
                        .unix(input?.thong_tin_chung?.doi_ca?.ngay_muon_doi)
                        .format('DD-MM-YYYY') || '',
              },
              'Ca đổi': {
                value: input?.thong_tin_chung?.doi_ca?.ca_muon_doi || '',
              },
              'Ngày cần đổi': {
                value:
                  input?.thong_tin_chung?.doi_ca?.ngay_can_doi.toString()
                    .length > 10
                    ? moment
                        .unix(
                          moment(
                            input?.thong_tin_chung?.doi_ca?.ngay_can_doi
                          ).unix()
                        )
                        .format('DD-MM-YYYY')
                    : moment
                        .unix(input?.thong_tin_chung?.doi_ca?.ngay_can_doi)
                        .format('DD-MM-YYYY') || '',
              },
              'Ca cần đổi': {
                value: input?.thong_tin_chung?.doi_ca?.ca_can_doi,
              },
            },
          },
          'Lý do xin đổi ca': {
            value: input?.thong_tin_chung?.doi_ca?.ly_do || '',
          },
        }
        return dataObj
      case 4:
        dataObj.dxInfo = {
          'Người tạo': {
            value: input?.nguoi_tao,
          },
          'Nhóm đề xuất': {
            value: 'Đơn xin cấp phát tài sản',
            color: '#4C5BD4',
          },
          'Thời gian tạo': {
            value:
              input?.thoi_gian_tao &&
              input?.thoi_gian_tao.toString().length > 10
                ? moment
                    .unix(moment(input?.thoi_gian_tao).unix())
                    .format('HH:mm A DD/MM/YYYY')
                : moment
                    .unix(input?.thoi_gian_tao)
                    .format('HH:mm A DD/MM/YYYY'),
          },
          'Cập nhật': {
            value: `${moment().diff(
              input?.thoi_gian_tao.toString().length > 10
                ? moment.unix(moment(input?.thoi_gian_tao).unix())
                : moment.unix(input?.thoi_gian_tao),
              'days'
            )} ngày trước`,
          },
        }
        dataObj.commonInfo = {
          'Họ và tên': {
            value: input?.nguoi_tao,
            color: '#4C5BD4',
          },
          'Tài sản đề xuất': {
            value:
              input?.thong_tin_chung?.cap_phat_tai_san?.danh_sach_tai_san || '',
          },
          'Số lượng': {
            value:
              input?.thong_tin_chung?.cap_phat_tai_san?.so_luong_tai_san || '',
          },
          'Lý do cấp phát tài sản': {
            value: input?.thong_tin_chung?.cap_phat_tai_san?.ly_do || '',
          },
        }
        return dataObj
      case 5:
        dataObj.dxInfo = {
          'Người tạo': {
            value: input?.nguoi_tao,
          },
          'Nhóm đề xuất': {
            value: 'Đơn xin thôi việc',
            color: '#4C5BD4',
          },
          'Thời gian tạo': {
            value:
              input?.thoi_gian_tao &&
              input?.thoi_gian_tao.toString().length > 10
                ? moment
                    .unix(moment(input?.thoi_gian_tao).unix())
                    .format('HH:mm A DD/MM/YYYY')
                : moment
                    .unix(input?.thoi_gian_tao)
                    .format('HH:mm A DD/MM/YYYY'),
          },
          'Cập nhật': {
            value: `${moment().diff(
              input?.thoi_gian_tao.toString().length > 10
                ? moment.unix(moment(input?.thoi_gian_tao).unix())
                : moment.unix(input?.thoi_gian_tao),
              'days'
            )} ngày trước`,
          },
        }
        dataObj.commonInfo = {
          'Họ và tên': {
            value: input?.nguoi_tao,
            color: '#4C5BD4',
          },
          'Ngày bắt đầu nghỉ': {
            value:
              input?.thong_tin_chung?.thoi_viec?.ngaybatdau_tv &&
              input?.thong_tin_chung?.thoi_viec?.ngaybatdau_tv.toString()
                .length > 10
                ? moment
                    .unix(
                      moment(
                        input?.thong_tin_chung?.thoi_viec?.ngaybatdau_tv
                      ).unix()
                    )
                    .format('DD-MM-YYYY')
                : moment
                    .unix(input?.thong_tin_chung?.thoi_viec?.ngaybatdau_tv)
                    .format('DD-MM-YYYY') || '',
          },
          'Ca bắt đầu nghỉ': {
            value: input?.thong_tin_chung?.thoi_viec?.ca_bdnghi || '',
          },
          'Lý do xin thôi việc': {
            value: input?.thong_tin_chung?.thoi_viec?.ly_do || '',
          },
        }
        return dataObj
      case 6:
        dataObj.dxInfo = {
          'Người tạo': {
            value: input?.nguoi_tao,
          },
          'Nhóm đề xuất': {
            value: 'Đơn xin tăng lương',
            color: '#4C5BD4',
          },
          'Thời gian tạo': {
            value:
              input?.thoi_gian_tao &&
              input?.thoi_gian_tao.toString().length > 10
                ? moment
                    .unix(moment(input?.thoi_gian_tao).unix())
                    .format('HH:mm A DD/MM/YYYY')
                : moment
                    .unix(input?.thoi_gian_tao)
                    .format('HH:mm A DD/MM/YYYY'),
          },
          'Cập nhật': {
            value: `${moment().diff(
              input?.thoi_gian_tao.toString().length > 10
                ? moment.unix(moment(input?.thoi_gian_tao).unix())
                : moment.unix(input?.thoi_gian_tao),
              'days'
            )} ngày trước`,
          },
        }
        dataObj.commonInfo = {
          'Họ và tên': {
            value: input?.nguoi_tao,
            color: '#4C5BD4',
          },
          'Mức lương hiện tại': {
            value:
              Intl.NumberFormat('ja-JP').format(
                input?.thong_tin_chung?.tang_luong?.mucluong_ht
              ) + ' VNĐ' || '',
          },
          'Mức lương đề xuất tăng thêm': {
            value:
              Intl.NumberFormat('ja-JP').format(
                input?.thong_tin_chung?.tang_luong?.mucluong_tang
              ) + ' VNĐ' || '',
          },
          'Ngày đề xuất tăng thêm': {
            value:
              input?.thong_tin_chung?.tang_luong?.date_tang_luong &&
              input?.thong_tin_chung?.tang_luong?.date_tang_luong.toString()
                .length > 10
                ? moment
                    .unix(
                      moment(
                        input?.thong_tin_chung?.tang_luong?.date_tang_luong
                      ).unix()
                    )
                    .format('DD-MM-YYYY')
                : moment
                    .unix(input?.thong_tin_chung?.tang_luong?.date_tang_luong)
                    .format('DD-MM-YYYY') || '',
          },
          'Lý do xin tăng lương': {
            value: input?.thong_tin_chung?.tang_luong?.ly_do || '',
          },
        }
        return dataObj
      case 12:
        dataObj.dxInfo = {
          'Người tạo': {
            value: input?.nguoi_tao,
          },
          'Nhóm đề xuất': {
            value: 'Đề xuất xin sử dụng phòng họp',
            color: '#4C5BD4',
          },
          'Thời gian tạo': {
            value:
              input?.thoi_gian_tao &&
              input?.thoi_gian_tao.toString().length > 10
                ? moment
                    .unix(moment(input?.thoi_gian_tao).unix())
                    .format('HH:mm A DD/MM/YYYY')
                : moment
                    .unix(input?.thoi_gian_tao)
                    .format('HH:mm A DD/MM/YYYY'),
          },
          'Cập nhật': {
            value: `${moment().diff(
              input?.thoi_gian_tao.toString().length > 10
                ? moment.unix(moment(input?.thoi_gian_tao).unix())
                : moment.unix(input?.thoi_gian_tao),
              'days'
            )} ngày trước`,
          },
        }
        dataObj.commonInfo = {
          'Họ và tên': {
            value: input?.nguoi_tao,
            color: '#4C5BD4',
          },
          'Thời gian sử dụng từ': {
            value:
              input?.thong_tin_chung?.su_dung_phong_hop?.bd_hop &&
              input?.thong_tin_chung?.su_dung_phong_hop?.bd_hop.toString()
                .length > 10
                ? moment
                    .unix(
                      moment(
                        input?.thong_tin_chung?.su_dung_phong_hop?.bd_hop
                      ).unix()
                    )
                    .format('hh:mm A DD-MM-YYYY')
                : moment
                    .unix(input?.thong_tin_chung?.su_dung_phong_hop?.bd_hop)
                    .format('hh:mm A DD-MM-YYYY') || '',
          },
          'Đến ngày': {
            value:
              input?.thong_tin_chung?.su_dung_phong_hop?.end_hop &&
              input?.thong_tin_chung?.su_dung_phong_hop?.end_hop.toString()
                .length > 10
                ? moment
                    .unix(
                      moment(
                        input?.thong_tin_chung?.su_dung_phong_hop?.end_hop
                      ).unix()
                    )
                    .format('hh:mm A DD-MM-YYYY')
                : moment
                    .unix(input?.thong_tin_chung?.su_dung_phong_hop?.end_hop)
                    .format('hh:mm A DD-MM-YYYY') || '',
          },
          'Lý do đề xuất xin sử dụng phòng họp': {
            value: input?.thong_tin_chung?.su_dung_phong_hop?.ly_do || '',
          },
        }
        return dataObj
      case 16:
        dataObj.dxInfo = {
          'Người tạo': {
            value: input?.nguoi_tao,
          },
          'Nhóm đề xuất': {
            value: 'Đề xuất khiếu nại',
            color: '#4C5BD4',
          },
          'Thời gian tạo': {
            value:
              input?.thoi_gian_tao &&
              input?.thoi_gian_tao.toString().length > 10
                ? moment
                    .unix(moment(input?.thoi_gian_tao).unix())
                    .format('HH:mm A DD/MM/YYYY')
                : moment
                    .unix(input?.thoi_gian_tao)
                    .format('HH:mm A DD/MM/YYYY'),
          },
          'Cập nhật': {
            value: `${moment().diff(
              input?.thoi_gian_tao.toString().length > 10
                ? moment.unix(moment(input?.thoi_gian_tao).unix())
                : moment.unix(input?.thoi_gian_tao),
              'days'
            )} ngày trước`,
          },
        }
        dataObj.commonInfo = {
          'Họ và tên': {
            value: input?.nguoi_tao,
            color: '#4C5BD4',
          },
          'Nội dung khiếu nại': {
            value: input?.thong_tin_chung?.khieu_nai?.ly_do || '',
          },
        }
        return dataObj
      case 15:
        dataObj.dxInfo = {
          'Người tạo': {
            value: input?.nguoi_tao,
          },
          'Nhóm đề xuất': {
            value: 'Đề xuất thanh toán',
            color: '#4C5BD4',
          },
          'Thời gian tạo': {
            value:
              input?.thoi_gian_tao &&
              input?.thoi_gian_tao.toString().length > 10
                ? moment
                    .unix(moment(input?.thoi_gian_tao).unix())
                    .format('HH:mm A DD/MM/YYYY')
                : moment
                    .unix(input?.thoi_gian_tao)
                    .format('HH:mm A DD/MM/YYYY'),
          },
          'Cập nhật': {
            value: `${moment().diff(
              input?.thoi_gian_tao.toString().length > 10
                ? moment.unix(moment(input?.thoi_gian_tao).unix())
                : moment.unix(input?.thoi_gian_tao),
              'days'
            )} ngày trước`,
          },
        }
        dataObj.commonInfo = {
          'Họ và tên': {
            value: input?.nguoi_tao,
            color: '#4C5BD4',
          },
          'Số tiền thanh toán': {
            value:
              Intl.NumberFormat('ja-JP').format(
                input?.thong_tin_chung?.thanh_toan?.so_tien_tt
              ) + ' VNĐ' || '',
          },
          'Lý do đề xuất thanh toán': {
            value: input?.thong_tin_chung?.thanh_toan?.ly_do || '',
          },
        }
        return dataObj
      case 19:
        dataObj.dxInfo = {
          'Người tạo': {
            value: input?.nguoi_tao,
          },
          'Nhóm đề xuất': {
            value: 'Đề xuất cộng/trừ tiền',
            color: '#4C5BD4',
          },
          'Thời gian tạo': {
            value:
              input?.thoi_gian_tao &&
              input?.thoi_gian_tao.toString().length > 10
                ? moment
                    .unix(moment(input?.thoi_gian_tao).unix())
                    .format('HH:mm A DD/MM/YYYY')
                : moment
                    .unix(input?.thoi_gian_tao)
                    .format('HH:mm A DD/MM/YYYY'),
          },
          'Cập nhật': {
            value: `${moment().diff(
              input?.thoi_gian_tao.toString().length > 10
                ? moment.unix(moment(input?.thoi_gian_tao).unix())
                : moment.unix(input?.thoi_gian_tao),
              'days'
            )} ngày trước`,
          },
        }
        let temp_money =
          input?.thong_tin_chung?.thuong_phat?.type_tp === 1
            ? {
                'Cộng tiền': {
                  value:
                    Intl.NumberFormat('ja-JP').format(
                      input?.thong_tin_chung?.thuong_phat?.so_tien_tp
                    ) + ' VNĐ' || '',
                  color: '#70BE28',
                },
              }
            : {
                'Trừ tiền': {
                  value:
                    Intl.NumberFormat('ja-JP').format(
                      input?.thong_tin_chung?.thuong_phat?.so_tien_tp
                    ) + ' VNĐ' || '',
                  color: '#DA302A',
                },
              }
        dataObj.commonInfo = {
          'Họ và tên': {
            value: input?.nguoi_tao,
            color: '#4C5BD4',
          },
          ...temp_money,
          'Ngày áp dụng': {
            value:
              (input?.thong_tin_chung?.thuong_phat?.time_tp &&
                moment(input?.thong_tin_chung?.thuong_phat?.time_tp).format(
                  'DD-MM-YYYY'
                )) ||
              '',
          },
          'Lý do đề xuất thanh toán': {
            value: input?.thong_tin_chung?.thuong_phat?.ly_do || '',
          },
        }
        return dataObj
      // đề xuất xin nghỉ phép
      case 1:
        if (input?.thong_tin_chung?.nghi_phep_ra_ngoai?.bd_nghi) {
          dataObj.dxInfo = {
            'Người tạo': {
              value: input?.nguoi_tao,
            },
            'Nhóm đề xuất': {
              value: 'Đơn xin nghỉ phép ra ngoài',
              color: 'blue',
            },
            'Thời gian tạo': {
              value: moment
                .unix(input?.thoi_gian_tao / 1000000)
                ?.format('HH:mm A DD-MM-YYYY'),
            },
            'Loại đề xuất': {
              value:
                input?.loai_de_xuat === 0
                  ? 'Đề xuất có kế hoạch'
                  : 'Đề xuất đột xuất',
            },
            'Cập nhật': {
              value: `${moment().diff(
                moment.unix(input?.thoi_gian_tao / 1000000),
                'day'
              )} ngày trước`,
            },
          }
          dataObj.commonInfo = {
            'Họ và tên': {
              value: input?.nguoi_tao,
              color: '#4C5BD4',
            },

            'Thời gian ra ngoài': {
              more: {
                'Từ ngày': {
                  value:
                    input?.thong_tin_chung?.nghi_phep_ra_ngoai?.bd_nghi &&
                    moment(
                      input?.thong_tin_chung?.nghi_phep_ra_ngoai?.bd_nghi
                    )?.format('DD-MM-YYYY'),
                },
                'Đến ngày': {
                  value:
                    input?.thong_tin_chung?.nghi_phep_ra_ngoai?.kt_nghi &&
                    moment(
                      input?.thong_tin_chung?.nghi_phep_ra_ngoai?.kt_nghi
                    )?.format('DD-MM-YYYY'),
                },
                'Ca nghỉ': {
                  value: input?.thong_tin_chung?.nghi_phep_ra_ngoai?.ca_nghi,
                },
                'Thời gian ra ngoài': {
                  value:
                    input?.thong_tin_chung?.nghi_phep_ra_ngoai?.bd_nghi &&
                    moment(
                      input?.thong_tin_chung?.nghi_phep_ra_ngoai?.bd_nghi
                    )?.format('HH:mm A'),
                },
                'Thời gian quay lại': {
                  value:
                    input?.thong_tin_chung?.nghi_phep_ra_ngoai?.kt_nghi &&
                    moment(
                      input?.thong_tin_chung?.nghi_phep_ra_ngoai?.kt_nghi
                    )?.format('HH:mm A'),
                },
              },
            },
            'Lý do': {
              value: input?.thong_tin_chung?.nghi_phep_ra_ngoai?.ly_do,
            },
          }
        } else if (
          input?.thong_tin_chung?.nhap_ngay_nhan_luong?.ngay_nhan_luong
        ) {
          dataObj.dxInfo = {
            'Người tạo': {
              value: input?.nguoi_tao,
            },
            'Nhóm đề xuất': {
              value: 'Đề xuất ngày nhận lương',
              color: 'blue',
            },
            'Thời gian tạo': {
              value: moment
                .unix(input?.thoi_gian_tao / 1000000)
                ?.format('HH:mm A DD-MM-YYYY'),
            },
            'Loại đề xuất': {
              value:
                input?.loai_de_xuat === 0
                  ? 'Đề xuất có kế hoạch'
                  : 'Đề xuất đột xuất',
            },
            'Cập nhật': {
              value: `${moment().diff(
                moment.unix(input?.thoi_gian_tao / 1000000),
                'day'
              )} ngày trước`,
            },
          }
          dataObj.commonInfo = {
            'Họ và tên': {
              value: input?.nguoi_tao,
              color: '#4C5BD4',
            },

            'Ngày đề xuất nhận lương': {
              value:
                input?.thong_tin_chung?.nhap_ngay_nhan_luong?.ngay_nhan_luong &&
                moment(
                  input?.thong_tin_chung?.nhap_ngay_nhan_luong?.ngay_nhan_luong
                )?.format('DD-MM-YYYY'),
            },
            'Lý do': {
              value:
                input?.thong_tin_chung?.nhap_ngay_nhan_luong?.ly_do ||
                'Chưa cập nhật',
            },
          }
        } else if (input?.thong_tin_chung?.xin_tai_tai_lieu?.ten_tai_lieu) {
          dataObj.dxInfo = {
            'Người tạo': {
              value: input?.nguoi_tao,
            },
            'Nhóm đề xuất': {
              value: 'Đề xuất xin tải tài liệu',
              color: 'blue',
            },
            'Thời gian tạo': {
              value: moment
                .unix(input?.thoi_gian_tao / 1000000)
                ?.format('HH:mm A DD-MM-YYYY'),
            },

            'Cập nhật': {
              value: `${moment().diff(
                moment.unix(input?.thoi_gian_tao / 1000000),
                'day'
              )} ngày trước`,
            },
          }
          dataObj.commonInfo = {
            'Họ và tên': {
              value: input?.nguoi_tao,
              color: '#4C5BD4',
            },

            'Phần mềm tải tài liệu': {
              value: input?.thong_tin_chung?.xin_tai_tai_lieu?.ten_tai_lieu,
            },
            'Lý do': {
              value:
                input?.thong_tin_chung?.xin_tai_tai_lieu?.ly_do ||
                'Chưa cập nhật',
            },
          }
        } else {
          dataObj.dxInfo = {
            'Người tạo': {
              value: input?.nguoi_tao,
            },
            'Nhóm đề xuất': {
              value: 'Đơn xin nghỉ phép',
              color: 'blue',
            },
            'Thời gian tạo': {
              value: moment
                .unix(input?.thoi_gian_tao / 1000)
                ?.format('HH:mm A DD-MM-YYYY'),
            },
            'Loại đề xuất': {
              value:
                input?.loai_de_xuat === 0
                  ? 'Đề xuất có kế hoạch'
                  : 'Đề xuất đột xuất',
            },
            'Cập nhật': {
              value: `${moment().diff(
                moment.unix(input?.thoi_gian_tao / 1000),
                'day'
              )} ngày trước`,
            },
          }

          let lisNghi = {}
          Object.keys(input?.thong_tin_chung?.nghi_phep?.nd)?.forEach(
            (k, indx) => {
              lisNghi[`Lịch nghỉ ${indx + 1}`] = {
                noIndex: true,
                more: {
                  'Ngày bắt đầu nghỉ': {
                    value:
                      input?.thong_tin_chung?.nghi_phep?.nd?.[indx]?.bd_nghi,
                  },
                  'Ngày kết thúc nghỉ': {
                    value:
                      input?.thong_tin_chung?.nghi_phep?.nd?.[indx]?.kt_nghi,
                  },
                  'Ca nghỉ': {
                    value:
                      input?.thong_tin_chung?.nghi_phep?.nd?.[indx]?.ca_nghi ===
                      1
                        ? 'Nghỉ cả ngày'
                        : 'Nghỉ nửa ngày',
                  },
                },
              }
            }
          )
          lisNghi = {
            ...lisNghi,
            'Lý do nghỉ': {
              value: input?.thong_tin_chung?.nghi_phep?.ly_do || '',
            },
          }
          dataObj.commonInfo = {
            'Họ và tên': {
              value: input?.nguoi_tao,
              color: '#4C5BD4',
            },
            ...lisNghi,
          }
        }
        return dataObj

      // đề xuất luân chuyển công tác
      case 8:
        dataObj.dxInfo = {
          'Người tạo': {
            value: input?.nguoi_tao,
          },
          'Nhóm đề xuất': {
            value: 'Đề xuất luân chuyển công tác',
            color: 'blue',
          },
          'Thời gian tạo': {
            value: moment
              .unix(input?.thoi_gian_tao / 1000)
              ?.format('HH:mm A DD-MM-YYYY'),
          },
          'Cập nhật': {
            value: `${moment().diff(
              moment.unix(input?.thoi_gian_tao / 1000),
              'day'
            )} ngày trước`,
          },
        }

        // noi dung
        dataObj.commonInfo = {
          'Họ và tên': {
            value: input?.nguoi_tao,
          },
          'Phòng ban': {
            value: input?.thong_tin_chung?.luan_chuyen_cong_tac?.pb_nguoi_lc,
            more: {
              'Chức vụ hiện tại': {
                value:
                  input?.thong_tin_chung?.luan_chuyen_cong_tac?.cv_nguoi_lc,
              },
            },
          },
          'Nơi đang công tác': {
            value: input?.thong_tin_chung?.luan_chuyen_cong_tac?.noi_cong_tac,
          },
          'Nơi xin chuyển đến': {
            value: input?.thong_tin_chung?.luan_chuyen_cong_tac?.noi_chuyen_den,
          },
          'Lý do': {
            value: input?.thong_tin_chung?.luan_chuyen_cong_tac?.ly_do,
          },
        }
        return dataObj

      case 17:
        dataObj.dxInfo = {
          'Người tạo': {
            value: input?.nguoi_tao,
          },
          'Nhóm đề xuất': {
            value: 'Đề xuất cộng công',
            color: 'blue',
          },
          'Thời gian tạo': {
            value: moment
              .unix(input?.thoi_gian_tao / 1000)
              ?.format('HH:mm A DD-MM-YYYY'),
          },
          'Loại cộng công': {
            value: input?.cc_type ? 'Cộng công theo ca' : 'Cộng công theo ngày',
          },
          'Cập nhật': {
            value: `${moment().diff(
              moment.unix(input?.thoi_gian_tao / 1000),
              'day'
            )} ngày trước`,
          },
        }
        dataObj.commonInfo = {
          'Họ và tên': {
            value: input?.nguoi_tao,
            color: 'blue',
          },
          'Ngày xác nhận': {
            value: moment(
              input?.thong_tin_chung?.xac_nhan_cong?.time_xnc
            )?.format('DD-MM-YYYY'),
          },
          'Ca làm việc': {
            value: input?.thong_tin_chung?.xac_nhan_cong.ca_xnc,
            more: {
              'Thời gian bắt đầu': {
                value: input?.thong_tin_chung?.xac_nhan_cong?.time_vao_ca,
              },
              'Thời gian kết thúc': {
                value: input?.thong_tin_chung?.xac_nhan_cong?.time_het_ca,
              },
            },
          },
          'Lý do': {
            value: input?.thong_tin_chung?.xac_nhan_cong?.ly_do,
          },
        }
        return dataObj

      // đề xuất cơ sở vật chất
      case 14:
        dataObj.dxInfo = {
          'Người tạo': {
            value: input?.nguoi_tao,
          },
          'Nhóm đề xuất': {
            value: 'Đề xuất sửa chữa cơ sở vật chất',
            color: 'blue',
          },
          'Thời gian tạo': {
            value: moment
              .unix(input?.thoi_gian_tao / 1000)
              ?.format('HH:mm A DD-MM-YYYY'),
          },

          'Cập nhật': {
            value: `${moment().diff(
              moment.unix(input?.thoi_gian_tao / 1000),
              'day'
            )} ngày trước`,
          },
        }

        //handle parsing json
        let listFix = {}
        const json = JSON.parse(
          input?.thong_tin_chung?.sua_chua_co_so_vat_chat?.input_csv
        )
        // const json2 = JSON.parse(json)

        if (json) {
          json?.forEach((item, indx) => {
            listFix[indx + 1] = {
              more: {
                'Tên tài sản': {
                  value: item?.name,
                },
                'Lý do sửa chữa': {
                  value: item?.reason,
                },
                'Chi phí dự kiến': {
                  value: `${item?.amount} VNĐ`,
                },
              },
            }
          })
        }

        dataObj.commonInfo = {
          'Họ và tên': {
            value: input?.nguoi_tao,
          },
          'Cơ sở vật chất cần sửa': {
            more: { ...listFix },
          },
          'Lý do': {
            value: input?.thong_tin_chung?.sua_chua_co_so_vat_chat?.ly_do,
          },
        }

        return dataObj
      //Đề xuất sử dụng xe công
      case 13:
        dataObj.dxInfo = {
          'Người tạo': {
            value: input?.nguoi_tao,
          },
          'Nhóm đề xuất': {
            value: LIST_DX[input?.nhom_de_xuat],
            color: 'blue',
          },
          'Thời gian tạo': {
            value: moment
              .unix(input?.thoi_gian_tao / 1000)
              ?.format('HH:mm A DD-MM-YYYY'),
          },

          'Cập nhật': {
            value: `${moment().diff(
              moment.unix(input?.thoi_gian_tao / 1000),
              'day'
            )} ngày trước`,
          },
        }

        dataObj.commonInfo = {
          'Họ và tên': {
            value: input?.nguoi_tao,
          },
          'Số lượng xe': {
            value: input?.thong_tin_chung?.su_dung_xe_cong?.soluong_xe,
          },
          'Thời gian sử dụng từ': {
            value: moment
              .unix(input?.thong_tin_chung?.su_dung_xe_cong?.bd_xe)
              ?.format('HH:mm A DD-MM-YYYY'),
          },
          'Đến ngày': {
            value: moment
              .unix(input?.thong_tin_chung?.su_dung_xe_cong?.end_xe)
              ?.format('HH:mm A DD-MM-YYYY'),
          },
          'Lý do': {
            value: input?.thong_tin_chung?.su_dung_xe_cong?.ly_do,
          },
        }
        return dataObj
      // Đề xuaastr tăng ca
      case 10:
        dataObj.dxInfo = {
          'Người tạo': {
            value: input?.nguoi_tao,
          },
          'Nhóm đề xuất': {
            value: LIST_DX[input?.nhom_de_xuat],
            color: 'blue',
          },
          'Thời gian tạo': {
            value: moment
              .unix(input?.thoi_gian_tao / 1000)
              ?.format('HH:mm A DD-MM-YYYY'),
          },

          'Cập nhật': {
            value: `${moment().diff(
              moment.unix(input?.thoi_gian_tao / 1000),
              'day'
            )} ngày trước`,
          },
        }

        dataObj.commonInfo = {
          'Họ và tên': {
            value: input?.nguoi_tao,
          },
          'Thời gian': {
            value: moment
              .unix(input?.thong_tin_chung?.tang_ca?.time_tc)
              ?.format('HH:mm A DD-MM-YYYY'),
          },
          'Ca tăng': {
            value: input?.thong_tin_chung?.tang_ca?.shift_id,
          },

          'Lý do': {
            value: input?.thong_tin_chung?.tang_ca?.ly_do,
          },
        }

        return dataObj
      //Đề xuất nghỉ thai sản
      case 11:
        dataObj.dxInfo = {
          'Người tạo': {
            value: input?.nguoi_tao,
          },
          'Nhóm đề xuất': {
            value: LIST_DX[input?.nhom_de_xuat],
            color: 'blue',
          },
          'Thời gian tạo': {
            value: moment
              .unix(input?.thoi_gian_tao / 1000)
              ?.format('HH:mm A DD-MM-YYYY'),
          },

          'Cập nhật': {
            value: `${moment().diff(
              moment.unix(input?.thoi_gian_tao / 1000),
              'day'
            )} ngày trước`,
          },
        }

        dataObj.commonInfo = {
          'Họ và tên': {
            value: input?.nguoi_tao,
          },
          'Thời gian nghỉ từ ngày': {
            value: moment
              .unix(input?.thong_tin_chung?.nghi_thai_san?.ngaybatdau_nghi_ts)
              ?.format('HH:mm A DD-MM-YYYY'),
          },
          'Ngày kết thúc nghỉ': {
            value: moment
              .unix(input?.thong_tin_chung?.nghi_thai_san?.ngayketthuc_nghi_ts)
              ?.format('HH:mm A DD-MM-YYYY'),
          },

          'Lý do': {
            value: input?.thong_tin_chung?.nghi_thai_san?.ly_do,
          },
        }

        return dataObj
      //Đề xuất lịch làm việc
      case 18:
        dataObj.dxInfo = {
          'Người tạo': {
            value: input?.nguoi_tao,
          },
          'Nhóm đề xuất': {
            value: LIST_DX[input?.nhom_de_xuat],
            color: 'blue',
          },
          'Loại lịch làm việc': {
            value:
              input?.thong_tin_chung?.lich_lam_viec?.lich_lam_viec === 1
                ? 'Thứ 2 - Thứ 6'
                : input?.thong_tin_chung?.lich_lam_viec?.lich_lam_viec === 2
                ? 'Thứ 2 - Thứ 7'
                : 'Thứ 2 - CN',
          },
          'Thời gian tạo': {
            value: moment
              .unix(input?.thoi_gian_tao / 1000)
              ?.format('HH:mm A DD-MM-YYYY'),
          },

          'Cập nhật': {
            value: `${moment().diff(
              moment.unix(input?.thoi_gian_tao / 1000),
              'day'
            )} ngày trước`,
          },
        }

        dataObj.commonInfo = {
          'Họ và tên': {
            value: input?.nguoi_tao,
          },
          'Lịch làm việc': {
            value:
              input?.thong_tin_chung?.lich_lam_viec?.lich_lam_viec === 1
                ? 'Thứ 2 - Thứ 6'
                : input?.thong_tin_chung?.lich_lam_viec?.lich_lam_viec === 2
                ? 'Thứ 2 - Thứ 7'
                : 'Thứ 2 - CN',
          },
          'Tháng áp dụng': {
            value: moment
              .unix(input?.thong_tin_chung?.lich_lam_viec?.thang_ap_dung)
              ?.format('MM-YYYY'),
          },
          'Ngày bắt đầu làm việc': {
            value: moment
              .unix(input?.thong_tin_chung?.lich_lam_viec?.ngay_bat_dau)
              ?.format('MM-YYYY'),
          },

          'Chi tiết lịch làm việc': {
            component: (
              <Button
                style={{ border: '1px solid #4C5BD4' }}
                onClick={() => setOpen(true)}>
                <p style={{ color: '#4C5BD4' }}> Xem lịch làm việc</p>
              </Button>
            ),
          },
          'Lý do': {
            value: input?.thong_tin_chung?.lich_lam_viec?.ly_do,
          },
        }

        return dataObj
      //Đề xuất xin đi muôn vbeef sớm
      case 21:
        dataObj.dxInfo = {
          'Người tạo': {
            value: input?.nguoi_tao,
          },
          'Nhóm đề xuất': {
            value: LIST_DX[input?.nhom_de_xuat],
            color: 'blue',
          },

          'Thời gian tạo': {
            value: moment
              .unix(input?.thoi_gian_tao / 1000000)
              ?.format('HH:mm A DD-MM-YYYY'),
          },

          'Cập nhật': {
            value: `${moment().diff(
              moment.unix(input?.thoi_gian_tao / 1000000),
              'day'
            )} ngày trước`,
          },
        }

        dataObj.commonInfo = {
          'Họ và tên': {
            value: input?.nguoi_tao,
          },

          'Thông tin đi muộn về sớm': {
            more: {
              'Ngày đi muộn về sớm': {
                value:
                  input?.thong_tin_chung?.di_muon_ve_som?.time_batdau &&
                  moment(
                    input?.thong_tin_chung?.di_muon_ve_som?.time_batdau
                  )?.format('DD-MM-YYYY'),
              },
              'Ca làm việc': {
                value: input?.thong_tin_chung?.di_muon_ve_som?.ca_lam_viec,
              },
              'Thời gian đi muộn về sớm': {
                value: `${moment(
                  input?.thong_tin_chung?.di_muon_ve_som?.time_ketthuc
                ).diff(
                  moment(input?.thong_tin_chung?.di_muon_ve_som?.time_batdau),
                  'hour'
                )} tiếng`,
              },
            },
          },
          'Lý do': {
            value: input?.thong_tin_chung?.di_muon_ve_som?.ly_do,
          },
        }
        return dataObj
      default:
        return {}
    }
  }
}
