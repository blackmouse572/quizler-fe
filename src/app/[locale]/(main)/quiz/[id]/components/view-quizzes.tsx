function ViewQuizzes() {
  return (
    <>

    {/* quiz */}
      <div className="z-10 mt-16 flex w-[849px] max-w-full items-start justify-between gap-5 px-5 max-md:mt-10 max-md:flex-wrap">
        <div className="flex-auto self-start text-xl font-bold leading-8 text-black">
          Terms in this bank (&123;total terms&125;)
        </div>
        <div className="mt-5 flex flex-col self-end whitespace-nowrap pb-2 font-medium text-white">
          <div className="mr-3 aspect-[1.75] justify-center self-end rounded-lg bg-red-600 px-1.5 text-center text-xs leading-4 shadow-sm max-md:mr-2.5">
            BETA
          </div>
          <div className="justify-center rounded-lg bg-zinc-900 py-1.5 pl-3 text-xs leading-4">
            View A.I answer
          </div>
        </div>
      </div>
      <div className="flex w-[849px] max-w-full items-start justify-between gap-5 rounded-xl border border-solid border-[color:var(--Colors-Neutral-300,#D4D4D4)] bg-white px-7 py-3.5 text-base text-black shadow-sm max-md:flex-wrap max-md:px-5">
        <div className="mt-1 flex justify-between gap-5 max-md:max-w-full max-md:flex-wrap">
          <div className="flex-auto leading-6">
            A plant, such as an iris, that reproduces asexually most of the time
            probably:A) is found in a changing environment.B) produces offspring
            that move into new environments.C) lacks the ability to make
            flowers.D) forms spores.E) has offspring that live in the same
            environment as the parents.
          </div>
          <div className="self-start leading-[150%]">A</div>
        </div>
        <img
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/0f8e92642df1fdf5059c7fb93ec528f5d04a1cd781e450b82ac104cb5b0199aa?"
          className="aspect-square w-4"
        />
      </div>
      <div className="mt-4 w-[849px] max-w-full rounded-xl border border-solid border-[color:var(--Colors-Neutral-300,#D4D4D4)] bg-white px-6 py-4 shadow-sm max-md:px-5">
        <div className="max-md: flex gap-5 max-md:flex-col max-md:gap-0">
          <div className="flex w-6/12 flex-col max-md:ml-0 max-md:w-full">
            <div className="text-base leading-6 text-black max-md:mt-10">
              A plant, such as an iris, that reproduces asexually most of the
              time probably:A) is found in a changing environment.B) produces
              offspring that move into new environments.C) lacks the ability to
              make flowers.D) forms spores.E) has offspring that live in the
              same environment as the parents.
            </div>
          </div>
          <div className="ml-5 flex w-6/12 flex-col max-md:ml-0 max-md:w-full">
            <div className="text-base leading-6 text-black max-md:mt-10">A</div>
          </div>
        </div>
      </div>
      <div className="mt-36 text-xl font-bold leading-8 text-black max-md:mt-10 max-md:max-w-full">
        Students also viewed these
      </div>
      <div className="mt-7 flex w-[849px] max-w-full justify-between gap-5 overflow-x-auto px-5 max-md:flex-wrap">
        <div className="flex flex-1 flex-col justify-center rounded-3xl border border-solid border-[color:var(--color-border,#E4E4E7)] bg-white shadow">
          <div className="flex flex-col items-start py-6 pl-6 pr-20 max-md:px-5">
            <div className="whitespace-nowrap text-base font-semibold leading-6 text-zinc-950">
              Lorem isplum
            </div>
            <div className="mt-1.5 text-sm leading-5 text-zinc-500">
              320 cards
            </div>
          </div>
        </div>
        <div className="flex flex-1 flex-col justify-center rounded-3xl border border-solid border-[color:var(--color-border,#E4E4E7)] bg-white shadow">
          <div className="flex flex-col items-start py-6 pl-6 pr-20 max-md:px-5">
            <div className="whitespace-nowrap text-base font-semibold leading-6 text-zinc-950">
              Lorem isplum
            </div>
            <div className="mt-1.5 text-sm leading-5 text-zinc-500">
              320 cards
            </div>
          </div>
        </div>
        <div className="flex flex-1 flex-col justify-center rounded-3xl border border-solid border-[color:var(--color-border,#E4E4E7)] bg-white shadow">
          <div className="flex flex-col items-start py-6 pl-6 pr-20 max-md:px-5">
            <div className="whitespace-nowrap text-base font-semibold leading-6 text-zinc-950">
              Lorem isplum
            </div>
            <div className="mt-1.5 text-sm leading-5 text-zinc-500">
              320 cards
            </div>
          </div>
        </div>
        <div className="z-10 flex flex-1 flex-col justify-center rounded-3xl border border-solid border-[color:var(--color-border,#E4E4E7)] bg-white shadow">
          <div className="flex flex-col items-start py-6 pl-6 pr-20 max-md:px-5">
            <div className="whitespace-nowrap text-base font-semibold leading-6 text-zinc-950">
              Lorem isplum
            </div>
            <div className="mt-1.5 text-sm leading-5 text-zinc-500">
              320 cards
            </div>
          </div>
        </div>
      </div>



      {/* author */}
      <div className="mt-36 text-xl font-bold leading-8 text-black max-md:mt-10 max-md:max-w-full">
        This quiz is belong to:
      </div>
      <div className="flex gap-5 justify-between px-5 mt-6 ml-3.5 max-w-full font-medium w-[874px] max-md:flex-wrap">
        <div className="flex-auto text-2xl leading-10 text-black">
          Class: <span className="font-bold">Eva’s class Biology</span>
        </div>
        <div className="flex gap-1 self-start text-xs leading-4 text-white whitespace-nowrap">
          <div className="flex flex-col justify-end pb-2 shadow-md aspect-[1.6]">
            <div className="justify-center px-3 py-1.5 rounded-lg aspect-[2] bg-zinc-900">
              Copy
            </div>
          </div>
          <div className="flex flex-col justify-end pb-2 shadow-md aspect-[1.83]">
            <div className="justify-center px-3 py-1.5 rounded-lg aspect-[2.29] bg-zinc-900">
              Report
            </div>
          </div>
        </div>
      </div>
      <div className="flex gap-5 justify-between pr-6 ml-3.5 max-w-full w-[874px] max-md:flex-wrap max-md:pr-5">
        <div className="flex gap-2 justify-between whitespace-nowrap">
          <img
            loading="lazy"
            srcSet="..."
            className="my-auto w-8 aspect-square"
          />
          <div className="flex flex-col flex-1">
            <div className="text-sm font-medium leading-5 text-zinc-950">
              Teacher: Eva Doe
            </div>
            <div className="text-xs leading-4 text-zinc-500">
              eva@example.com
            </div>
          </div>
        </div>
        <div className="flex gap-2 justify-between">
          <div className="flex justify-center items-center px-2.5 w-9 h-9 rounded-xl shadow-sm aspect-square bg-zinc-100">
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/5b792eadeacc74ad176a5f54ed669177f80a50c3702ca8da86fa879b4d900113?"
              className="w-full aspect-square"
            />
          </div>
          <div className="flex justify-center items-center px-2.5 w-9 h-9 rounded-xl shadow-sm aspect-square bg-zinc-100">
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/bfa5d78da2809e2345ae621b0dc8c785db6e059a0ff55856810061d1f0a0d30b?"
              className="w-full aspect-square"
            />
          </div>
        </div>
      </div>

      

      {/* link to another */}
      <div className="flex flex-col justify-center items-start self-stretch px-11 py-7 mt-80 w-full text-base bg-white max-md:px-5 max-md:mt-10 max-md:max-w-full">
        <div className="flex gap-5 justify-between max-w-full w-[923px] max-md:flex-wrap">
          <div className="flex flex-col">
            <div className="flex gap-1.5 justify-between tracking-widest text-center text-black whitespace-nowrap">
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/86b70a3d23b6e625c9aab5ac0ce591e471f393f213e877b530e86aaca7d8b45d?"
                className="w-6 aspect-square"
              />
              <div className="flex-auto">Quizlearn</div>
            </div>
            <div className="leading-6 text-zinc-900">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas
              mi risus, lobortis sit amet urna ac, aliquam interdum nibh.
              Phasellus vestibulum tincidunt tellus,{" "}
            </div>
          </div>
          <div className="flex flex-col self-start py-1.5 font-semibold leading-[150%] text-zinc-900">
            <div className="flex gap-5 justify-between px-0.5">
              <div>Link 1</div>
              <div>Link 1</div>
              <div>Link 1</div>
            </div>
            <div className="flex gap-5 justify-between px-0.5 mt-7">
              <div>Link 1</div>
              <div>Link 1</div>
              <div>Link 1</div>
            </div>
            <div className="flex gap-5 justify-between px-0.5 mt-7">
              <div>Link 1</div>
              <div>Link 1</div>
              <div>Link 1</div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ViewQuizzes
