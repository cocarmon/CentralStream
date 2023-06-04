import './BottomToggle.css';
import api from '../api';

export const BottomToggle = ({ client, setClient, setLiveStreamEnded }) => {
  const releaseChannel = async () => {
    if (client) {
      client.stopBroadcast();
      await api.post('/streams/releaseChannel', {
        arn: client.arn,
      });
      setClient(null);
      setLiveStreamEnded(true);
    }
  };
  const handleShareable = () => {
    navigator.clipboard.writeText(client.viewLink);
  };
  const handleRecord = async () => {
    const recordResponse = await api.get('/streams/tag-object/');
  };
  return (
    <div className="container-fluid">
      <div className="d-flex justify-content-center ">
        <button className="btn btn-danger " onClick={releaseChannel}>
          End
        </button>
        <div className="input-group custom-input-width mr-4">
          <span class="input-group-text" id="basic-addon1">
            <i className="bi bi-clipboard" onClick={handleShareable}></i>
          </span>
          <input
            type="text"
            className="form-control"
            aria-describedby="basic-addon1"
            id="shareable"
            name="publicLink"
            readOnly
            value={client.viewLink}
          />
        </div>
        <button className="btn btn-primary " onClick={handleRecord}>
          Record
        </button>
      </div>
    </div>
  );
};
