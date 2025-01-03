// import Header from "@/components/shared/Header";
// import TransformationForm from "@/components/shared/TransformationForm";
// import { transformationTypes } from "@/constants";
// import { getUserById } from "@/lib/actions/user.actions";
// import { auth } from "@clerk/nextjs/server";
// import { redirect } from "next/navigation";



// const AddTransformationTypePage = async ({
//   params: { type },
// }: SearchParamProps) => {
//   const { userId } = await auth();
//   const transformation = transformationTypes[type];

//   if (!userId) redirect("/sign-in");

//   const user = await getUserById(userId);

//   return (
//     <>
//       <Header title={transformation.title} subtitle={transformation.subTitle} />

//       <section className="mt-10">
//         <TransformationForm
//           action="Add"
//           userId={user._id}
//           type={transformation.type as TransformationTypeKey}
//           creditBalance={user.creditBalance}
//         />
//       </section>
//     </>
//   );
// };

// export default AddTransformationTypePage;




import Header from "@/components/shared/Header";
import TransformationForm from "@/components/shared/TransformationForm";
import { transformationTypes } from "@/constants";
import { getUserById } from "@/lib/actions/user.actions";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

type TransformationTypeKey = keyof typeof transformationTypes;

const AddTransformationTypePage = async ({
  params,
}: {
  params: Promise<{ type: TransformationTypeKey }>; // params is now treated as a Promise
}) => {
  const { type } = await params; // Await params to resolve the `type`
  const { userId } = await auth();

  console.log("Authenticated User ID:", userId);

  if (!userId) {
    redirect("/sign-in");
  }

  const transformation = transformationTypes[type];
  const user = await getUserById(userId);

  if (!user) {
    console.error("User not found");
    throw new Error("User not found");
  }

  return (
    <>
      <Header title={transformation.title} subtitle={transformation.subTitle} />
      <section className="mt-10">
        <TransformationForm
          action="Add"
          userId={user._id}
          type={transformation.type as TransformationTypeKey}
          creditBalance={user.creditBalance}
        />
      </section>
    </>
  );
};

export default AddTransformationTypePage;
