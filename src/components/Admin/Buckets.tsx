import { useNavigate } from "react-router-dom";
import { buildState, buildTutopediaForAdmin } from "../../builders/Builders";
import "./Buckets.css";
import {
  ROUTE_BUCKETS,
  TUTOPEDIA_CONTENT_ADMIN_PAGE_BUCKETS_BUTTON,
} from "../../data/layout/layout";

const Buckets = ({ count }: { count: number }) => {
  const navigate = useNavigate();

  const handleBuckets = () => {
    const tutopedia = buildTutopediaForAdmin(
      count,
      "Go To Buckets",
      TUTOPEDIA_CONTENT_ADMIN_PAGE_BUCKETS_BUTTON,
      `/${ROUTE_BUCKETS}`
    );
    navigate(tutopedia.routeURL!, buildState(tutopedia));
  };

  return (
    <button
      data-title={TUTOPEDIA_CONTENT_ADMIN_PAGE_BUCKETS_BUTTON}
      className="bucketsbutton"
      onClick={handleBuckets}
    >
      <svg
        fill="none"
        height="24"
        viewBox="0 0 24 24"
        width="24"
        className="svg-icon"
      >
        <g
          clip-rule="evenodd"
          fill-rule="evenodd"
          stroke="#056dfa"
          stroke-linecap="round"
          stroke-width="2"
        >
          <path
            fill="none"
            d="M16.588,3.411h-4.466c0.042-0.116,0.074-0.236,0.074-0.366c0-0.606-0.492-1.098-1.099-1.098H8.901c-0.607,0-1.098,0.492-1.098,1.098c0,0.13,0.033,0.25,0.074,0.366H3.41c-0.606,0-1.098,0.492-1.098,1.098c0,0.607,0.492,1.098,1.098,1.098h0.366V16.59c0,0.808,0.655,1.464,1.464,1.464h9.517c0.809,0,1.466-0.656,1.466-1.464V5.607h0.364c0.607,0,1.1-0.491,1.1-1.098C17.688,3.903,17.195,3.411,16.588,3.411z M8.901,2.679h2.196c0.202,0,0.366,0.164,0.366,0.366S11.3,3.411,11.098,3.411H8.901c-0.203,0-0.366-0.164-0.366-0.366S8.699,2.679,8.901,2.679z M15.491,16.59c0,0.405-0.329,0.731-0.733,0.731H5.241c-0.404,0-0.732-0.326-0.732-0.731V5.607h10.983V16.59z M16.588,4.875H3.41c-0.203,0-0.366-0.164-0.366-0.366S3.208,4.143,3.41,4.143h13.178c0.202,0,0.367,0.164,0.367,0.366S16.79,4.875,16.588,4.875zM6.705,14.027h6.589c0.202,0,0.366-0.164,0.366-0.366s-0.164-0.367-0.366-0.367H6.705c-0.203,0-0.366,0.165-0.366,0.367S6.502,14.027,6.705,14.027z M6.705,11.83h6.589c0.202,0,0.366-0.164,0.366-0.365c0-0.203-0.164-0.367-0.366-0.367H6.705c-0.203,0-0.366,0.164-0.366,0.367C6.339,11.666,6.502,11.83,6.705,11.83z M6.705,9.634h6.589c0.202,0,0.366-0.164,0.366-0.366c0-0.202-0.164-0.366-0.366-0.366H6.705c-0.203,0-0.366,0.164-0.366,0.366C6.339,9.47,6.502,9.634,6.705,9.634z"
          ></path>
        </g>
      </svg>
      <span className="bucketslabel">Buckets</span>
    </button>
  );
};

export default Buckets;
