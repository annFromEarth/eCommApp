import { getSearchProducts } from './SearchRequest';
import { useState, useEffect } from 'react';
import { IItemList } from './searchType';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { EmptyDataItemList } from './EmtyDataItemList';
import { useNavigate } from 'react-router-dom';
import { PATH } from '../../services/routing/paths';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';

export function SearchListData(props: { valueSearch: string }) {
  const [itemList, setItemList] = useState<IItemList>(EmptyDataItemList);
  const [notFound, setNotFound] = useState(false);
  useEffect(() => {
    try {
      getSearchProducts(props.valueSearch).then((data: IItemList) => {
        if (data.results.length) {
          setNotFound(false);
          setItemList(data);
        } else {
          setNotFound(true);
        }
      });
    } catch (error) {
      //TODO: error handling
    }
  }, [props.valueSearch]);

  const navigate = useNavigate();
  const openDetailPage = (id: string) => {
    navigate(PATH.product + '/:' + id);
  };

  const listItems = itemList.results.map((item, index) => (
    <ListItem
      disablePadding
      key={index + 'item-plant-search'}
      onClick={() => openDetailPage(item.id)}
    >
      <ListItemButton>
        <ListItemAvatar>
          <Avatar alt="Profile Picture" src={item.masterVariant.images[0].url} />
        </ListItemAvatar>
        <ListItemText primary={item.name['en-GB']} />
      </ListItemButton>
    </ListItem>
  ));

  return (
    <Box sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
      <nav aria-label="secondary mailbox folders">
        {!notFound && <List>{listItems}</List>}
        {notFound && (
          <Box sx={{ m: '15px 0', p: '15px 0 15px 5px' }}>
            No results for &#171;{props.valueSearch}&#187;
          </Box>
        )}
      </nav>
    </Box>
  );
}
