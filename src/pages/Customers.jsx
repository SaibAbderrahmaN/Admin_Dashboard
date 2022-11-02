import React from 'react';
import { GridComponent, ColumnsDirective, ColumnDirective, Page, Selection, Inject, Edit, Toolbar, Sort, Filter } from '@syncfusion/ej2-react-grids';

import { customersGrid  } from '../data/dummy';
import { Header } from '../components';
import { useSelector, useDispatch } from "react-redux";
import {generatePublicUrl} from '../urlConfig'



const Customers = () => {
  const selectionsettings = { persistSelection: true };
  const toolbarOptions = ['Delete'];
  const editing = { allowDeleting: true, allowEditing: true };
  const product = useSelector((state) => state.product);


  const customProducts = product?.products.map((el,index,arr)=>{
    return { CustomerID:product?.products[index]?._id ,
      CustomerName:product?.products[index]?.name.substring(0,20),
        CustomerEmail:product?.products[index]?.slug,
        CustomerImage:generatePublicUrl(product?.products[index]?.productPictures[0]?.img) ,
        quantity: product?.products[index]?.quantity,
        slug: product?.products[index]?.slug,
        StatusBg: '#8BE78B',
        price: product?.products[index]?.price ,
        Weeks: product?.products[index]?.price,
        Location: 'algeria',

      }


  })
  console.log(customProducts)

  
  



  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
      <Header category="Page" title="products" />
      <GridComponent
        dataSource={customProducts}
        enableHover={false}
        allowPaging
        pageSettings={{ pageCount: 5 }}
        selectionSettings={selectionsettings}
        toolbar={toolbarOptions}
        editSettings={editing}
        allowSorting
      >
        <ColumnsDirective>
          {/* eslint-disable-next-line react/jsx-props-no-spreading */}
          {customersGrid.map((item, index) => <ColumnDirective key={index} {...item} />)}
        </ColumnsDirective>
        <Inject services={[Page, Selection, Toolbar, Edit, Sort, Filter]} />
      </GridComponent>
    </div>
  );
};

export default Customers;