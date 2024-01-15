import React, { useState, useEffect } from 'react';
import { GoogleMap, LoadScript, Marker, Circle, StandaloneSearchBox } from '@react-google-maps/api';
import { Button, Card, Input, Modal, Table } from 'antd';
import styles from './Map.module.css'
import { RollbackOutlined, SearchOutlined, PlusCircleOutlined, EnvironmentOutlined, FormOutlined, DeleteOutlined } from '@ant-design/icons';
import ConfirmModal, { TYPE_DELETE } from './Confirm'
import Image from 'next/image'

export const TYPE_ADD = 'add'
export const TYPE_UPDATE = 'update'

const GoogleMapComponent = (open, setOpen, type, selectedRow, list, setData) => {
  const defaultLocation = { lat: 21.0285, lng: 105.8542 };
  const [dataSend, setDataSend] = useState({})
  const [dataTable, setDataTable] = useState([])
  const [openConfirm, setOpenConfirm] = useState(false)
  const [openConfirmDel, setOpenConfirmDel] = useState(false)
  const [defaultCenter, setDefaultCenter] = useState({})
  const [listShow, setListShow] = useState([])
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [selectedAddress, setSelectedAddress] = useState('');
  const [changeRadius, getChangeRadius] = useState(false)
  const [changeAddress, getChangeAddress] = useState(false)
  const [click, setClick] = useState({})
  const apiKey = 'AIzaSyCnOlvWehML5IY0dYX6VHWlOM8nhSz68zY'
  // const columns = [
  //   {
  //     key: "cor_location_name",
  //     title: "Địa chỉ",
  //     dataIndex: "cor_location_name",
  //     align: "left",
  //     render: (text) => {
  //       return (
  //         <span className={styles.limit_text}>
  //           <EnvironmentOutlined /> {text}
  //         </span>
  //       );
  //     }
  //   },
  //   {
  //     key: "actions",
  //     title: "Tùy chọn",
  //     dataIndex: "",
  //     align: "center",
  //     render: (text, record) => {
  //       const handleModified = (e) => {
  //         setSelectedLocation({
  //           lat: e.cor_lat,
  //           long: e.cor_long,
  //           radius: e.cor_radius
  //         })
  //         setDefaultCenter({
  //           lat: e.cor_lat,
  //           lng: e.cor_long,
  //           radius: e.cor_radius,
  //           id: e.cor_id
  //         })
  //         setListShow(list?.filter(item => !(item.cor_id === e.cor_id)))
  //         setSelectedAddress(e.cor_location_name)
  //         setDataSend(e)
  //       };

  //       const handleDelete = (e) => {
  //         setDataSend(e)
  //         setOpenConfirmDel(true)
  //         // Xử lý khi click vào xoá, có thể sử dụng id để thực hiện hành động
  //       };

  //       return (
  //         <div className={styles.actions}>
  //           <span title="Chỉnh sửa" onClick={() => handleModified(text)}>
  //             <FormOutlined style={{ fontSize: '25px', color: '#08c' }} />
  //           </span>
  //           <span title="Xoá" onClick={() => handleDelete(text)}>
  //             <DeleteOutlined style={{ fontSize: '25px', color: '#FF0000' }} />
  //           </span>
  //         </div>
  //       );
  //     }
  //   }
  // ];
  const customMarkerOptions = {
    icon: {
      url: `https://maps.google.com/mapfiles/ms/micons/blue-dot.png`, // URL của hình ảnh Marker màu xanh
    },
  };
  const customMarkerOptionsCurrent = {
    icon: {
      url: `https://maps.google.com/mapfiles/ms/micons/yellow-dot.png`, // URL của hình ảnh Marker màu xanh
    },
  };
  const [responsive, setResponsive] = useState({
    minWidth: 0,
    mapStyles: {
      height: '50vh',
      width: '100%',
    }
  });
  useEffect(() => {
    const updateResponsive = () => {
      const screenWidth = window.innerWidth;
      let newResponse = {};
      if (screenWidth <= 414) {
        newResponse = {
          minWidth: 400,
          mapStyles: {
            height: '30vh',
            width: '100%',
          }
        };
      } else if (screenWidth > 414 && screenWidth <= 768) {
        newResponse = {
          minWidth: 600,
          mapStyles: {
            height: '30vh',
            width: '100%',
          }
        };
      } else if (screenWidth > 768 && screenWidth <= 1024) {
        newResponse = {
          minWidth: 800,
          mapStyles: {
            height: '50vh',
            width: '100%',
          }
        };
      } else if (screenWidth > 1024 && screenWidth <= 1400) {
        newResponse = {
          minWidth: 800,
          mapStyles: {
            height: '50vh',
            width: '100%',
          }
        };
      } else {
        newResponse = {
          minWidth: 800,
          mapStyles: {
            height: '50vh',
            width: '100%',
          }
        };
      }
      setResponsive(newResponse);
    };
    // Thêm event listener để theo dõi thay đổi kích thước màn hình
    window.addEventListener('resize', updateResponsive);
    // Gọi hàm updateResponsive lần đầu để set giá trị ban đầu
    updateResponsive();
    // Cleanup: loại bỏ event listener khi component bị unmount
    return () => {
      window.removeEventListener('resize', updateResponsive);
    };
  }, []);

  useEffect(() => {
    getChangeRadius(false)
    getChangeAddress(false)
  }, [selectedLocation])
  useEffect(() => {
    if (open) {
      if (type === TYPE_UPDATE) {
        setDataSend(selectedRow)
        setDataTable(list)
        setSelectedLocation({
          ...selectedRow,
          long: selectedRow.cor_long,
          lat: selectedRow.cor_lat,
          radius: selectedRow.cor_radius
        })
        setSelectedAddress(selectedRow.cor_location_name)
        setListShow(list?.filter(item => !(item.cor_id === selectedRow.cor_id)))
        setDefaultCenter({
          lat: selectedRow.cor_lat,
          lng: selectedRow.cor_long,
          id: selectedRow.cor_id,
          radius: selectedRow.cor_radius
        })
      } else {
        if (list && list.length > 0) {
          setDefaultCenter({
            lat: list[0].cor_lat,
            lng: list[0].cor_long,
            id: list[0].cor_id,
            radius: list[0].cor_radius
          })
          setListShow(list.slice(1))
        } else {
          setDefaultCenter(defaultLocation)
          setListShow(list)
        }
      }

    }
  }, [selectedRow, open])

  const handleMapClick = async (event) => {

    const clickedLocation = {
      lat: event.latLng.lat(),
      long: event.latLng.lng(),
      radius: 0,
    }

    setSelectedLocation(clickedLocation)
    setClick({
      lat: clickedLocation.lat,
      lng: clickedLocation.long,
      radius: clickedLocation.radius
    })
    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${clickedLocation.lat},${clickedLocation.long}&key=${apiKey}`,
      );

      if (response.ok) {
        const data = await response.json();
        console.log(data)
        setSelectedAddress(data.results[0]?.formatted_address || 'Address not found');
      } else {
        setSelectedAddress('Address not found');
      }
    } catch (error) {
      console.error('Error fetching address:', error);
      setSelectedAddress('Address not found');
    }
  };

  const handleMarkerClick = (event) => {

    const clickedLocation = {
      lat: event.latLng.lat(),
      lng: event.latLng.lng(),
    }
    const newList = list?.filter(item => !(item.cor_lat === clickedLocation.lat && item.cor_long === clickedLocation.lng))
    const picker = list?.filter(item => (item.cor_lat === clickedLocation.lat && item.cor_long === clickedLocation.lng))
    setSelectedLocation({
      lat: picker[0].cor_lat,
      long: picker[0].cor_long,
      radius: picker[0].cor_radius
    })
    setSelectedAddress(picker[0].cor_location_name)
    setListShow(newList)
    setDefaultCenter({
      lat: clickedLocation.lat,
      lng: clickedLocation.lng,
      radius: picker[0].cor_radius
    });
  }

  const [searchValue, setSearchValue] = useState('');
  const handleSearch = async () => {
    try {
      const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(searchValue)}&key=${apiKey}`;

      const response = await fetch(url);

      if (response.ok) {
        const data = await response.json();

        if (data.results.length > 0) {
          const location = {
            lat: data.results[0].geometry.location.lat,
            lng: data.results[0].geometry.location.lng,
            radius: 0,
            long: data.results[0].geometry.location.lng
          }
          setDefaultCenter(location)
          setSelectedAddress(searchValue)
          setSelectedLocation(location)
          setClick()

          console.log(data);
        } else {
          console.error('No results found for the given address');
          alert('Không tìm thấy địa điểm')
        }
      } else {
        console.error('Failed to fetch data:', response.statusText);
        alert('Lỗi: ' + response.statusText)

      }
    } catch (error) {
      alert('Lỗi')
      console.error('Error fetching data:', error);
    }
  };

  const handleInputChange = (e) => {
    // Cập nhật giá trị khi người dùng nhập vào trường input
    setSearchValue(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // Ngăn chặn việc tải lại trang khi nhấn nút Submit
    handleSearch();
  };


  return (
    <>
      <Modal
        open={open}
        style={{ minWidth: responsive.minWidth }}
        //width={responsive.minWidth}
        width={'70%'}
        onCancel={() => {
          setSearchValue('')
          setSelectedAddress('')
          setSelectedLocation(null)
          setClick(null)
          setOpen(false)
        }}
        closable={false}
        destroyOnClose={true}
        okButtonProps={{ style: { display: 'none' } }}
        cancelButtonProps={{ style: { display: 'none' } }}
        footer={[
          // <Button value="large" className={styles.button_back} key="back" onClick={() => {
          //   setSearchValue('')
          //   setSelectedAddress('')
          //   setSelectedLocation(null)
          //   setClick(null)
          //   setOpen(false)
          // }}>
          //   Quay lại <RollbackOutlined />
          // </Button>
        ]}
      >
        <div className={styles.content_modal}>
          <div className={styles.title}>
            {
              type === TYPE_ADD ? <>
                <h2>Thêm mới vị trí</h2>
              </> : <>
                <h2>Cập nhật vị trí</h2>
              </>
            }
            <p className={styles.description}><i>Nhập địa chỉ hoặc chọn trên bản đồ</i></p>
          </div>
          <div className={styles.form_input}>
            <form onSubmit={handleSubmit}>
              <label>
                Địa chỉ:
              </label>
              <div className={styles.input_address}>
                <Input value={searchValue} onChange={handleInputChange} className={styles.input} />
                <Button shape='circle' htmlType="submit">
                  <SearchOutlined style={{ fontSize: '16px', color: 'black' }} />
                </Button>
              </div>
            </form>
          </div>
          <div>
            {/* {selectedLocation && (
              <div>
                <Card className={styles.info_location}>
                  <h3>Vị trí chọn</h3>
                  <div className={styles.info}>
                    <h4>Địa chỉ:</h4>
                    <p>{selectedAddress}</p>
                    <label><strong>Bán kính:</strong></label>
                    <div className={styles.add_radius}>
                      {
                        changeRadius ? <>
                          <input id='change_radius' />
                          <span>m </span>
                        </> : <>
                          <p>{selectedLocation.radius ? selectedLocation.radius : 0}m</p>
                          <FormOutlined onClick={() => { getChangeRadius(true) }} style={{ margin: '0 0 0 5px', fontSize: '20px', color: '#08c', textAlign: 'center', cursor: 'pointer' }} />
                        </>
                      }
                    </div>
                    <h4>Tọa độ:</h4>
                    <p>X: {selectedLocation.lat} </p>
                    <p>Y: {selectedLocation.long}</p>
                  </div>
                  {
                    type === TYPE_ADD ? <>
                      <Button style={{ textAlign: 'center' }} htmlType="submit" onClick={() => {
                        const newData = {
                          cor_location_name: selectedAddress,
                          cor_lat: selectedLocation.lat,
                          cor_long: selectedLocation.long,
                          cor_radius: document.getElementById('change_radius')?.value ? document.getElementById('change_radius')?.value : selectedLocation.radius
                        }
                        setDataSend(newData)
                        setOpenConfirm(true)
                      }}>
                        {
                          <h4><PlusCircleOutlined /> Thêm mới</h4>
                        }
                      </Button>
                    </> : <>
                      <Button style={{ textAlign: 'center' }} htmlType="submit" onClick={() => {
                        const newData = {
                          cor_id: dataSend.cor_id,
                          cor_location_name: selectedAddress,
                          cor_lat: selectedLocation.lat,
                          cor_long: selectedLocation.long,
                          cor_radius: document.getElementById('change_radius')?.value ? document.getElementById('change_radius')?.value : selectedLocation.radius
                        }
                        setDataSend(newData)
                        setOpenConfirm(true)
                      }}>
                        {
                          <h4><FormOutlined style={{ color: '#08c' }} />  Sửa đổi</h4>
                        }
                      </Button>
                      <Button style={{ textAlign: 'center', marginLeft: '5px' }} htmlType="submit" onClick={() => {
                        const newData = {
                          cor_id: dataSend.cor_id,
                        }
                        setDataSend(newData)
                        setOpenConfirmDel(true)
                      }}>
                        {
                          <h4><DeleteOutlined style={{ color: '#FF0000' }} />  Xóa</h4>
                        }
                      </Button>
                    </>
                  }
                </Card>
              </div>
            )} */}
          </div>

          <div className={styles.container_content}>
            <div className={styles.map}>
              {
                open ? <>
                  <Card>
                    <LoadScript googleMapsApiKey={apiKey}>
                      <GoogleMap
                        center={defaultCenter}
                        zoom={15}
                        //mapContainerStyle={responsive.mapStyles}
                        mapContainerStyle={responsive.mapStyles} // Thiết lập chiều dài và chiều rộng theo đơn vị phần trăm (%)
                        onClick={handleMapClick}
                      >
                        {listShow?.map((location, index) => (
                          <Marker key={index} position={{
                            lat: location.cor_lat,
                            lng: location.cor_long
                          }} options={customMarkerOptions} onClick={handleMarkerClick} />
                        ))}
                        {listShow?.map((location, index) => (
                          <Circle
                            key={index}
                            center={{
                              lat: location.cor_lat,
                              lng: location.cor_long
                            }}
                            radius={location.cor_radius}
                            options={{
                              strokeColor: 'blue', // Màu viền của vòng tròn
                              strokeOpacity: 0.5,
                              strokeWeight: 1,
                              fillColor: 'blue', // Màu nền của vòng tròn
                              fillOpacity: 0.2,
                              clickable: false,
                            }}
                          />
                        ))}
                        {
                          click ? <>
                            <Marker position={click} options={customMarkerOptionsCurrent} />
                          </> : <></>
                        }
                        <Marker position={defaultCenter} />
                        <Circle
                          center={defaultCenter}
                          radius={defaultCenter.radius}
                          options={{
                            strokeColor: 'blue', // Màu viền của vòng tròn
                            strokeOpacity: 0.5,
                            strokeWeight: 1,
                            fillColor: 'blue', // Màu nền của vòng tròn
                            fillOpacity: 0.2,
                            clickable: false,
                          }}
                        />
                      </GoogleMap>

                    </LoadScript>
                  </Card>
                </> : <></>
              }
            </div>
            {selectedLocation && (
              <div className={styles.info_location}>
                <Card>
                  <h3>Vị trí chọn</h3>
                  <div className={styles.info}>
                    <h4>Địa chỉ:</h4>
                    {
                      changeAddress ? <>
                        <div>
                          <textarea style={{
                            width: '100%',
                            height: '80px',
                            margin: '0 5px 0 5px',
                            padding: '5px 8px 5px 8px',
                            border: '1px solid #ACACAC',
                            borderRadius: '5px',
                            textAlign: 'justify'
                          }} id='chang_address' defaultValue={selectedAddress} />
                        </div>

                      </> : <>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                          <p style={{ textAlign: 'justify' }}>
                            {selectedAddress}
                          </p>
                          <Image
                            alt='/'
                            src={'/add-icon.png'}
                            width={22}
                            height={22}
                            style={{ margin: '0 0 0 5px', fontSize: '20px', color: '#4c5bd4', textAlign: 'center', cursor: 'pointer', top: '50%' }}
                            onClick={() => { getChangeAddress(true) }}
                          />
                        </div>

                      </>
                    }
                    <label><strong>Bán kính cho phép chấm công:</strong></label>
                    <div className={styles.add_radius}>
                      {
                        changeRadius ? <>
                          <input id='change_radius' />
                          <span>m </span>
                        </> : <>
                          <p>{selectedLocation.radius ? selectedLocation.radius : 0}m</p>
                          <Image
                            alt='/'
                            src={'/add-icon.png'}
                            width={22}
                            height={22}
                            style={{ margin: '0 0 0 5px', fontSize: '20px', color: '#4c5bd4', textAlign: 'center', cursor: 'pointer' }}
                            onClick={() => { getChangeRadius(true) }}
                          />
                        </>
                      }
                    </div>
                    <h4>Tọa độ:</h4>
                    <p>X: {selectedLocation.lat} </p>
                    <p>Y: {selectedLocation.long}</p>
                  </div>
                  <div className={styles.location_box}>
                    {
                      type === TYPE_ADD ? <>
                        <Button className={styles.button_add} htmlType="submit" onClick={() => {
                          const newData = {
                            cor_location_name: document.getElementById('chang_address')?.value ? document.getElementById('chang_address')?.value : selectedAddress,
                            cor_lat: selectedLocation.lat,
                            cor_long: selectedLocation.long,
                            cor_radius: document.getElementById('change_radius')?.value ? document.getElementById('change_radius')?.value : selectedLocation.radius
                          }
                          setDataSend(newData)
                          setOpenConfirm(true)
                        }}>
                          {
                            <h4>Thêm mới</h4>
                          }
                        </Button>
                      </> : <>
                        <Button className={styles.button_modified} htmlType="submit" onClick={() => {
                          const newData = {
                            cor_id: dataSend.cor_id,
                            cor_location_name: document.getElementById('chang_address')?.value ? document.getElementById('chang_address')?.value : selectedAddress,
                            cor_lat: selectedLocation.lat,
                            cor_long: selectedLocation.long,
                            cor_radius: document.getElementById('change_radius')?.value ? document.getElementById('change_radius')?.value : selectedLocation.radius
                          }
                          setDataSend(newData)
                          setOpenConfirm(true)
                        }}>
                          {
                            <h4> Sửa đổi</h4>
                          }
                        </Button>
                        <Button danger className={styles.button_delete} htmlType="submit" onClick={() => {
                          const newData = {
                            cor_id: dataSend.cor_id,
                          }
                          setDataSend(newData)
                          setOpenConfirmDel(true)
                        }}>
                          {
                            <h4> Xóa</h4>
                          }
                        </Button>
                      </>
                    }
                  </div>
                </Card>
              </div>
            )}

            {/* {
              type === TYPE_UPDATE ? <>
                <div className={styles.list_address}>
                  <Card>
                    <div className={styles.header}>
                      <p style={{ fontSize: '18px', fontWeight: '600', marginBottom: '10px' }}>Danh sách địa chỉ</p>
                    </div>
                    <Table columns={columns}
                      dataSource={dataTable}
                      rowKey={(record, index) => index + 1}
                      pagination={{ pageSize: 10 }}
                      size="small"
                      showHeader={false} />
                  </Card>
                </div>
              </> : <></>
            } */}
          </div>
          {
            type === TYPE_UPDATE ? <>
              {ConfirmModal(openConfirm, setOpenConfirm, TYPE_UPDATE, dataSend, setData, setOpen)}

            </> : <>
              {ConfirmModal(openConfirm, setOpenConfirm, TYPE_ADD, dataSend, setData, setOpen)}
            </>
          }
          {ConfirmModal(openConfirmDel, setOpenConfirmDel, TYPE_DELETE, dataSend, setData, setOpen)}
        </div>
      </Modal>
    </>
  );
};

export default GoogleMapComponent;