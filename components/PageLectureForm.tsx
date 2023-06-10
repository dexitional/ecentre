import React from 'react'
import { MdOutlineArticle, MdSave } from 'react-icons/md';
import Input from './Input';
import Select from './Select';
import GoBack from './GoBack';
import ActionButton from './ActionButton';
import PageTitle from './PageTitle';
import CourseInput from './CourseInput';

type Props = {
    id?: string;
}

function PageLectureForm({ id }: Props) {
  
  const data = [];
  const days = [
    { label: 'MON', value: 'mon'},
    { label: 'TUE', value: 'tue'},
    { label: 'WED', value: 'wed'},
    { label: 'THU', value: 'thu'},
    { label: 'FRI', value: 'fri'},
    { label: 'SAT', value: 'sat'},
    { label: 'SUN', value: 'sun'},
  ]
  return (
    // <div className="pb-12 overflow-y-scroll scrollbar-hide">
    //     <form className="w-full border-separate border-spacing-0 border border-blue-900/30 rounded text-[0.86rem] text-blue-900/60">
            
            
    //     </form>
    // </div>
    <>
        <div className="w-full flex flex-col md:flex-row items-start md:items-center md:justify-between md:space-x-4 md:space-y-0 space-y-2">
            <div className="w-full md:w-fit flex flex-col md:flex-row md:items-center md:space-x-4 md:space-y-0 space-y-2">
                <div className="w-full flex items-center justify-between space-x-4">
                    <GoBack />
                    <div className="md:hidden">
                        <ActionButton title="" Icon={MdSave} onClick={null} />
                    </div>
                </div>
                <PageTitle title="LECTURES" />
            </div>
            <div className="hidden md:flex">
                <ActionButton title="Save" Icon={MdSave} onClick={null} />
            </div>
        </div>
        <div className="pb-12 overflow-y-scroll scrollbar-hide">
            <div className="w-full border-separate border-spacing-0 border border-blue-300/20 rounded text-[0.86rem] text-blue-900/60">
                <div className="md:grid md:grid-cols-5 bg-blue-400/10 text-blue-900/80 text-[0.86rem] font-inter font-medium tracking-wider">
                    <div className="px-6 py-3 font-semibold">NEW RECORD</div>
                </div>
                <div>
                  <form>
                    <div className="p-2 md:px-6 md:py-4 flex flex-col md:flex-row md:items-start space-y-3 md:space-y-0 md:space-x-6">
                        <div className="p-2 md:p-4 flex-1 flex flex-col space-y-2 rounded border border-blue-300/20 ">
                            <CourseInput label="Course" name="code" register={null} />
                            <Select label="Course" name="code" register={null} data={[{ value:'1',label:'No' },{ value:'2',label:'Yes'}]} />
                            <Select label="Day" name="day" register={null} data={days} />
                            <Input label="Start Time" name="starttime" type="time" register={null} />
                            {/* <Textarea label="Constituency minger Box" name="name" register={null} /> */}
                        </div>
                        <div className="p-2 md:p-4  flex-1 flex flex-col space-y-2 rounded border border-blue-300/20 ">
                            <Select label="Venue" name="name" register={null} data={[{ value:'1',label:'No' },{ value:'2',label:'Yes'}]} />
                            <Input label="Group" name="group" type="text" register={null} />
                            <Input label="End Time" name="endtime" type="time" register={null} />
                        </div>
                    </div>
                    <div className="px-2 pb-2 md:px-6 md:pb-4 flex flex-col md:flex-row md:items-start space-y-2 md:space-y-0 md:space-x-3">
                        <button className="px-3 py-1 w-full rounded border-2 border-blue-500 bg-blue-900 text-blue-200 font-semibold text-base">Save</button>
                        <button className="px-3 py-1 w-full rounded border-2 border-red-600 bg-red-900 text-red-200 font-semibold text-base">Cancel</button>
                    </div>
                  </form>
                </div>
            </div>
        </div>
    </>
  )
}

export default PageLectureForm