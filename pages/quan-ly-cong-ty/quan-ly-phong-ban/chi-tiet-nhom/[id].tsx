import { MyTable } from '@/components/quan-ly-cong-ty/quan-ly-phong-ban/table/Table';
import { Card, Col, Input, Row } from 'antd';
import Image from 'next/image';
import { useRouter } from 'next/router';
import styles from './[id].module.css';
import { AddButton } from '@/components/commons/Buttons';
import { useContext, useEffect, useState } from 'react';
import {
  AddEmpGroupModal,
  DeleteEmpFromGroup,
} from '@/components/quan-ly-cong-ty/danh-sach-nhom/modal';
import { POST_SS, getCompIdSS } from '@/pages/api/BaseApi';
import { renderPosition } from '@/utils/function';
import dayjs from 'dayjs';

export default function ChiTietNhom({ listEmpInGr }) {
  const router = useRouter();
  const [openAddState, setOpenAddState] = useState(false);
  const [openDel, setOpenDel] = useState(false);
  const [selectedRow, setSelectedRow] = useState();
  const [data, setData] = useState(listEmpInGr?.items);
  const [dataFilter, setDataFilter] = useState<any>(listEmpInGr?.items);
  const [inputValue, setInputValue] = useState<string>('');

  useEffect(() => {
    if (inputValue === '') {
      setDataFilter(data);
    } else {
      setDataFilter(
        data?.filter((e) =>
          e?.userName?.toLowerCase()?.includes(inputValue?.toLowerCase())
        )
      );
    }
  }, [inputValue]);

  const columns = [
    {
      title: <p className={styles.headertxt}>Ảnh</p>,
      render: (record: any) => (
        <Image
          alt="/"
          src={
            record?.avatarUser ? `/${record?.avatarUser}` : '/anhnhanvien.png'
          }
          width={30}
          height={30}
        />
      ),
      align: 'center',
    },
    {
      title: <p className={styles.headertxt}>ID</p>,
      render: (record: any) => <p>{record?.idQLC}</p>,
      align: 'center',
    },
    {
      title: <p className={styles.headertxt}>Họ và tên</p>,
      render: (record: any) => <p>{record?.userName}</p>,
      align: 'center',
    },
    {
      title: <p className={styles.headertxt}>Chức vụ</p>,
      render: (record: any) => <p>{renderPosition(record?.position_id)}</p>,
      align: 'center',
    },
    // {
    //   title: <p className={styles.headertxt}>Nhóm</p>,
    //   render: (record: any) => <p>{record?.groupName}</p>,
    //   align: "center"
    // },
    {
      title: <p className={styles.headertxt}>Ngày bắt đầu</p>,
      render: (record: any) => (
        <p>{dayjs.unix(record?.start_working_time).format('YYYY-MM-DD')}</p>
      ),
      align: 'center',
    },
    {
      title: <p className={styles.headertxt}>Chức năng</p>,
      render: (record: any) => (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
          }}
          onClick={() => {
            setSelectedRow(record);
            setOpenDel(true);
          }}
        >
          <Image alt="/" src={'/delete-icon.png'} width={25} height={25} />
        </div>
      ),
      align: 'center',
    },
  ];

  return (
    <div>
      <Card>
        <Row className={styles.header}>
          <Col md={10} xs={24}>
            <p className={styles.title}>Chi tiết {router.query?.name}</p>
          </Col>
          <Col md={14} xs={24} className={styles.actionGroup}>
            <Input
              className={styles.searchBar}
              size="large"
              placeholder={'Tìm kiếm nhân viên'}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              suffix={
                <Image
                  alt="/"
                  src={'/search-black.png'}
                  width={24}
                  height={24}
                />
              }
            />
            <div className={styles.btn}>
              {AddButton('Thêm mới nhân viên', () => setOpenAddState(true))}
            </div>
          </Col>
        </Row>
        <MyTable
          colunms={columns}
          data={dataFilter}
          onRowClick={() => null}
          hasRowSelect={false}
          onSelectChange={() => null}
          selectedRowKeys={[]}
          rowKey="gr_id"
          Footer={null}
        />
      </Card>
      <AddEmpGroupModal open={openAddState} setOpen={setOpenAddState} />
      <DeleteEmpFromGroup
        open={openDel}
        setOpen={setOpenDel}
        onConfirm={() => null}
        type="Nhóm"
        groupName={router.query?.name || ''}
        empData={selectedRow}
      />
    </div>
  );
}

export const getServerSideProps = async (context) => {
  const id = context.query?.id || null;
  let com_id = null;
  com_id = getCompIdSS(context);

  const listEmpInGr = await POST_SS(
    'api/qlc/managerUser/list',
    {
      com_id: com_id,
      gr_id: id,
    },
    context
  );

  return {
    props: {
      listEmpInGr,
    },
  };
};
