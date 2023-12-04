import { ModalWrapper } from '@/components/modal/ModalWrapper'
import { useRouter } from 'next/router'

export const ConfirmDuyetModal = ({
  open,
  setOpen,
  data,
}: {
  open: boolean
  setOpen: any
  data: any
}) => {
  const router = useRouter()
  const duyetUsers = async () => {
    console.log(data)
    setOpen(false)
    router.reload()
  }

  return ModalWrapper(
    open,
    setOpen,
    <p style={{ textAlign: 'center' }}>
      {data?.length > 1
        ? 'Các tài khoản đã được duyệt'
        : 'Tài khoản đã được duyệt'}
    </p>,
    400,
    '',
    'OK',
    () => duyetUsers(),
    false,
    true,
    false,
    false
  )
}
