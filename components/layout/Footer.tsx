export default function Footer() {
  return (
    <footer className="flex items-center justify-center py-8 border-t border-border">
      <span className="text-sm text-text-muted">
        &copy; {new Date().getFullYear()} Recipe Hub
      </span>
    </footer>
  );
}
