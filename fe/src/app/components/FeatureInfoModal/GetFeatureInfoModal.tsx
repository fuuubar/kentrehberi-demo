import { useContext } from 'react';
import './GetFeatureInfoModal.css';
import { RootStoreContext } from '../../stores/RootStore';
import { observer } from 'mobx-react-lite';

const classNamePrefix = "get-feature-info-modal"

const GetFeatureInfoModal = () => {
  const rootStore = useContext(RootStoreContext);
  const { show, OnCloseAction, GetContent } = rootStore.componentStores.getFeatureInfoModalStore;

  return (
    show ?
      <div className={classNamePrefix + "-overlay"} onClick={OnCloseAction}>
        <div className={classNamePrefix + "-content"} onClick={(e) => e.stopPropagation()}>
          <div className={classNamePrefix + "-header"}>
            <button className={classNamePrefix + "-close-button"} onClick={OnCloseAction}>
              &times;
            </button>
          </div>
          <div className={classNamePrefix + "-body"}>
            {GetContent.map(j => <p><span className='span1'>{j.key} :</span><span className='span2'>{j.value}</span></p>)}
          </div>
        </div>
      </div>
      : <></>);
};

export default observer(GetFeatureInfoModal);