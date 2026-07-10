import Banner from '../../Components/Dashboard/Banner';
import CountryStats from '../../Components/Dashboard/CountryStats';
import Graph from '../../Components/Dashboard/Graph';
import PaymentGraph from '../../Components/Dashboard/PaymentGraph';
import BookStatsTables from '../../Components/Dashboard/BookStatsTables';

const Dashboard = () => {
  return (
    <div className="flex flex-col gap-5 w-full">
      <Banner />
      
      <div className="grid grid-cols-1 lg:grid-cols-10 gap-5 w-full">
        <Graph />
        <PaymentGraph />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 w-full">
        <CountryStats />
        <BookStatsTables />
      </div>
    </div>
  );
};

export default Dashboard;
