type Props = { children: React.ReactNode };

export function Main({ children }: Props) {
  return <main className="container mx-auto px-4">{children}</main>;
}
