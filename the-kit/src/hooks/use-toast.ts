type Toast = {
  title: string;
  description?: string;
};

export function toast({ title, description }: Toast) {
  console.log("Toast:", title, description);
}
