import ContentCenter from "./components/ContentCenter";
import Header from "./components/Header";
import DialogConfirm from "./context/DialogConfirm";


export default function Home() {

  return (
    <div className=" h-screen    "   style={{
      overflow: "auto",
      scrollbarWidth: "none",
      msOverflowStyle: "none"}}>
      <Header />
      <ContentCenter />
      <DialogConfirm />

    </div>
  )
}
