import { observer } from 'mobx-react-lite';
import { useContext, useEffect } from 'react';
import { RootStoreContext } from '../../stores/RootStore';
import './MapView.css';
import GetFeatureInfoModal from '../../components/FeatureInfoModal/GetFeatureInfoModal';


const MapView = () => {
  const rootStore = useContext(RootStoreContext);
  const { InitMap } = rootStore.pageStores.mapStore;


  useEffect(() => {
    InitMap();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      <div id="map" className="map"></div>
      <GetFeatureInfoModal />
    </>

  );
};

export default observer(MapView);
