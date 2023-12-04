import { ChiTietDeXuatDangChoDuyet } from '@/components/tao-de-xuat/loai-de-xuat/tao-de-xuat/chi-tiet-de-xuat-dang-cho-duyet/chi-tiet-de-xuat-dang-cho-duyet'
import { POST_SS_VT, getCookieSS, getCurrentToken } from '@/pages/api/BaseApi'
import { useState } from 'react'
import jwt_decode from 'jwt-decode'
import { renderInfoDx } from '@/components/tao-de-xuat-2/components/chi-tiet-dx/constants'
import _ from 'lodash'
import { ModalDetailsLLV } from '@/components/tao-de-xuat/de-xuat-lich-lam-viec/chi-tiet-de-xuat/modal'

export default function ChiTietDangChoDuyet({ dxDetail }) {
  const [openModal, setOpenModal] = useState(false)
  let llvData: any = {}
  if (dxDetail?.nhom_de_xuat === 18) {
    llvData = JSON.parse(
      dxDetail?.thong_tin_chung?.lich_lam_viec?.ngay_lam_viec
    )?.[0]
    console.log(llvData)
  }

  const data = renderInfoDx(dxDetail, setOpenModal)
  return (
    <>
      <div>
        {!_.isEmpty(data)
          ? ChiTietDeXuatDangChoDuyet(data)
          : 'Không có dữ liệu  '}
      </div>
      {dxDetail?.nhom_de_xuat === 18 &&
        ModalDetailsLLV({
          open: openModal,
          setOpen: setOpenModal,
          data: llvData?.data,
          shiftType: llvData?.type,
        })}
    </>
  )
}

export const getServerSideProps = async (context) => {
  const idDx = context?.query?.id
  let dxDetail = {}
  const listDxRes = await POST_SS_VT(
    'api/vanthu/catedx/showCTDX',
    {
      _id: idDx,
    },
    context
  )

  // if (listDxRes?.showAll) {
  //   const temp = listDxRes?.showAll?.filter(
  //     (item) => item?._id === parseInt(idDx)
  //   )

  //   if (temp) {
  //     dxDetail = temp?.[0]
  //   }
  // }

  if (listDxRes) {
    dxDetail = listDxRes?.detailDeXuat?.[0]
  }

  return {
    props: {
      dxDetail: dxDetail || {},
    },
  }
}
