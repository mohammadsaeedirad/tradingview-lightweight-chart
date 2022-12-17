import React, { useState } from "react";
import { useRouter } from "next/router";
import styles from "../styles/components/Searchbar.module.scss";
import SearchIcon from "@mui/icons-material/Search";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import fa from "../i18n/fa.json";
import en from "../i18n/en.json";
import { Popover, Transition } from "@headlessui/react";
import SearchTableColumns from "../constants/SearchTableColumns.json";
import SearchTableRows from "../constants/SearchTableRows.json";
const Searchbar = ({ locale }) => {
  const t = locale === "fa" ? fa : en;
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [filter, setFilter] = React.useState(0);
  const [all, setAll] = React.useState(false);
  const handleSearch = () => {
    SearchTableRows.filter((data) => data.sign.includes(search)).map(
      (data, index) => {
        if (index == 0 && search != "") {
          router.push(`/${data.sign}`);
        }
      }
    );
  };
  const handleChange = (event, newValue) => {
    if (newValue == 5) {
      setAll(!all);
      setFilter(newValue);
    } else {
      setAll(false);
      setFilter(newValue);
    }
  };
  const getTd = (data, columns, index) => {
    if (data.hasOwnProperty(columns.key)) {
      for (const [key, value] of Object.entries(data)) {
        if (columns.key === key) {
          return (
            <td
              key={index}
              className='text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap'
            >
              {value}
            </td>
          );
        }
      }
    }
  };

  // const [selected, setSelected] = useState(false);
  return (
    <Popover>
      <Popover.Overlay className='fixed inset-0 bg-navy500 z-40 opacity-90' />

      <Popover.Button className={styles.search_card}>
        <SearchIcon />
        <input
          type='text'
          placeholder={t.entity.general.searchBarPlaceholder}
        />
        <a>
          <ArrowBackIosNewIcon />
        </a>
      </Popover.Button>
      <Transition
        enter='transition duration-100 ease-out'
        enterFrom='transform scale-95 opacity-0'
        enterTo='transform scale-100 opacity-100'
        leave='transition duration-75 ease-out'
        leaveFrom='transform scale-100 opacity-100'
        leaveTo='transform scale-95 opacity-0'
        className={` bg-navy500 mx-auto z-40 h-20 absolute left-0 right-0 top-3  shadow-md overflow-hidden`}
      >
        <Popover.Panel></Popover.Panel>
      </Transition>
      <Transition
        enter='transition duration-100 ease-out'
        enterFrom='transform scale-95 opacity-0'
        enterTo='transform scale-100 opacity-100'
        leave='transition duration-75 ease-out'
        leaveFrom='transform scale-100 opacity-100'
        leaveTo='transform scale-95 opacity-0'
        className={`${styles.search_modal} bg-navy100 mx-auto z-50 rounded-2xl shadow-md overflow-hidden md:left-[45.5%] left-[50%]`}
      >
        <Popover.Panel>
          <div className='text-white flex flex-row justify-between p-2 items-center h-16 rounded-2xl border-b-2 border-navy500 '>
            <SearchIcon />
            <input
              className='w-full bg-transparent px-1 h-16 focus:outline-none '
              type='text'
              autoFocus
              value={search}
              placeholder={t.entity.general.searchBarPlaceholder}
              onChange={(e) => {
                setSearch(e.target.value);
              }}
              onKeyPress={(e) => e.key === "Enter" && handleSearch()}
            />
            <a>
              <ArrowBackIosNewIcon />
            </a>
          </div>
          <Box className='' sx={{ maxWidth: { xs: 1000, sm: 1080 } }}>
            <Tabs
              value={filter}
              onChange={handleChange}
              variant='scrollable'
              scrollButtons={false}
              aria-label='scrollable prevent tabs example'
              className='my-4 flex flex-row justify-around'
            >
              <Tab className='flex-1 text-white ' label='iran' />
              <Tab className='flex-1 text-white ' label='world' />
              <Tab className='flex-1 text-white ' label='forex' />
              <Tab className='flex-1 text-white ' label='gold' />
              <Tab className='flex-1 text-white ' label='crypto' />
              <Tab className='flex-1 text-white ' label='all' />
            </Tabs>
          </Box>

          <div className='px-5 py-2 text-center'>
            <div className='flex flex-col'>
              <div className='flex flex-row'>
                <p>مرتب سازی بر اساس:</p>
              </div>
              <div className='overflow-x-auto  h-[300px] overflow-auto sm:-mx-6 lg:-mx-8'>
                <div className='py-4 inline-block min-w-full sm:px-6 lg:px-8'>
                  <div className='overflow-hidden rounded-xl p-1'>
                    <table className='min-w-full'>
                      <thead className='border-b border-navy500 bg-navy400'>
                        <tr>
                          {SearchTableColumns.map((col) => {
                            return (
                              <th
                                key={col.id}
                                scope='col'
                                className='text-sm font-medium text-white px-6 py-4'
                              >
                                {col.value}
                              </th>
                            );
                          })}
                        </tr>
                      </thead>
                      <tbody className='bg-navy200'>
                        {all
                          ? SearchTableRows.filter((data) =>
                              data.sign.includes(search)
                            ).map((data, index) => {
                              return (
                                <tr
                                  key={index}
                                  className=' border-b border-navy400'
                                >
                                  {SearchTableColumns &&
                                    SearchTableColumns.map((columns, index) => {
                                      return getTd(data, columns, index);
                                    })}
                                </tr>
                              );
                            })
                          : SearchTableRows.filter(
                              (data) =>
                                data.category == filter &&
                                data.sign.includes(search)
                            ).map((data, index) => {
                              return (
                                <tr
                                  key={index}
                                  className=' border-b border-navy400'
                                >
                                  {SearchTableColumns &&
                                    SearchTableColumns.map((columns, index) => {
                                      return getTd(data, columns, index);
                                    })}
                                </tr>
                              );
                            })}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <img src='/solutions.jpg' alt='' />
        </Popover.Panel>
      </Transition>
    </Popover>
  );
};

export default Searchbar;
