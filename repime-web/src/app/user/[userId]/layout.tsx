import getCurrentUser from "@/app/actions/getCurrentUser";

export default async function ResidenceLayout({
    children,
  }: {
    children: React.ReactNode;
  }) {
    return (
        <>
            <div>
              {children}
            </div>
        </>
    );
  }