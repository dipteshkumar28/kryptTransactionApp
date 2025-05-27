import { BsShieldFillCheck } from 'react-icons/bs';
import { BiSearchAlt } from 'react-icons/bi';
import { RiHeart2Fill } from 'react-icons/ri';

const ServiceCard = ({ color, title, icon, subtitle }) => (
  <div className="flex flex-row justify-start items-center white-glassmorphism p-3 m-2 cursor-pointer hover:shadow-xl ">
    <div className={`w-10 h-10 rounded-full flex justify-center items-center ${color}`}>
      {icon}
    </div>
    <div className="ml-5 flex-1 flex flex-col">
      <h3 className="text-white text-lg mt-2">{title}</h3>
      <p className="text-white text-sm mt-2 md:w-9/12">{subtitle}</p>

    </div>


  </div>
)
const Services = () => {
  return (
    <div className="flex flex-col md:flex-row w-full justify-center items-center gradient-bg-services">
      <div className="flex mf:flex-row flex-col items-center justify-between md:p-20 py-12 px-4">
        <div className="flex-1 flex flex-col justify-start items-start ">
          <h1 className="text-3xl sm:text-5xl text-white py-2 text-gradient">
            Services that we
            <br />
            continue to improve
          </h1>


        </div>
      </div>
      <div className=" flex-1 flex flex-col justify-start items-center w-full ">
        <div className='w-full max-w-3xl'>

          <ServiceCard
            color="bg-[#2952E3]"
            title="Security Guaranteed"
            icon={<BsShieldFillCheck fontSize={21} className="text-white" />}
            subtitle="Security is guaranteed. We always maintain privacy and maintain the quality of our products."
          />
          <ServiceCard
            color="bg-[#8945F8]"
            title="Best Exchange Rates"
            icon={<BiSearchAlt fontSize={21} className="text-white" />}
            subtitle="Get the best exchange rates in the market with our platform, ensuring you get the most value for your transactions."
          />
          <ServiceCard
            color="bg-[#F84550]"
            title="Fastest Transactions"
            icon={<RiHeart2Fill fontSize={21} className="text-white" />}
            subtitle="Experience lightning-fast transactions with our platform, ensuring your trades are executed in real-time."
          />
        </div>



      </div>
    </div>
  )
}

export default Services
