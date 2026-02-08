import Image from "next/image";
import Link from "next/link";

const PageBanner = ({ title }) => {
  return (
    <div className="relative w-full md:h-[260px] h-24 flex items-center justify-center">
      {/* Background Image */}
      <Image
        src="/allbanner.jpg"
        alt="Banner"
        fill
        className="object-fill"
        priority
      />

      {/* Overlay (optional) */}
      <div className="absolute inset-0 bg-white/10"></div>

      {/* Title */}
     <div className="flex flex-col relative z-10 text-center">
  <h1 className="text-black text-xl font-semibold">
    {title}
  </h1>
 <Link href={"/"}><p className="text-black text-sm pt-2">Home</p></Link>
</div>

    </div>
  );
};

export default PageBanner;
