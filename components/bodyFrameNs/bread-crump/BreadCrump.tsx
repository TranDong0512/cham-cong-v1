import { Breadcrumb } from 'antd'
import _ from 'lodash'
import { useRouter } from 'next/router'
import { LIST_ROUTES } from './ListBreadcrumbs'
import Image from 'next/image'
import styles from './BreadCrump.module.css'

export const MyBreadCrumb = ({ color }: { color: string }) => {
  const router = useRouter()
  const currentPathname = router.pathname
  let splitted: any[] = []

  if (currentPathname !== '/') {
    splitted = currentPathname?.split('/')?.map((item) => {
      if (item === '') {
        return null
      } else {
        const render = LIST_ROUTES(router?.query?.name)?.find(
          (route) => route.routeName === item
        )?.render
        return render === undefined ? null : render
      }
    })
  }

  // filter all null data
  splitted = splitted?.filter((item) => item)
  return (
    <>
      {!_.isEmpty(splitted) && (
        <span
          style={{
            // padding: "0px 20px"
            // marginTop: "10px",
            // display: "flex",
            color: `${color}`,
          }}
        // separator={<p style={{ color: `${color}` }}>/</p>}
        >
          {splitted?.map(
            (item, index) =>
              // <Breadcrumb.Item key={index}>
              // <span style={{ color: `${color}` }}>
              item + `${index !== splitted?.length - 1 ? ' / ' : ''}`

            // </Breadcrumb.Item>
          )}
        </span>
      )}
    </>
  )
}

export const BackButton = ({
  router,
  color,
  isCC,
}: {
  router: any
  color: string
  isCC: boolean
}) => {
  const onBackClick = () => {
    router.back()
  }

  return router.pathname === '/cham-cong' ? null : (
    <div className={styles.backButton} onClick={onBackClick}>
      <Image
        alt='/'
        src={isCC ? '/back-w.png' : '/back.png'}
        width={16}
        height={16}
      />
      <p
        className={styles.backTxt}
        style={{ color: `${color}`, fontSize: '18px' }}>
        Quay lại
      </p>
    </div>
  )
}
