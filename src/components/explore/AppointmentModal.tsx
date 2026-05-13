"use client";
import { useState } from "react";
import { CalendarClock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface AppointmentModalProps {
  lawyerName: string;
}

export function AppointmentModal({ lawyerName }: AppointmentModalProps) {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", date: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setOpen(false);
      setSubmitted(false);
      setForm({ name: "", email: "", date: "", message: "" });
    }, 2000);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm" variant="outline">
          <CalendarClock className="h-3.5 w-3.5" />
          Agendar cita
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Agendar cita con {lawyerName}</DialogTitle>
        </DialogHeader>
        {submitted ? (
          <p className="text-center py-6 text-primary font-medium">
            ¡Solicitud enviada! El abogado se pondrá en contacto contigo pronto.
          </p>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-3 mt-2">
            <Input
              placeholder="Tu nombre"
              required
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
            <Input
              type="email"
              placeholder="Tu email"
              required
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
            <Input
              type="date"
              placeholder="Fecha preferida"
              value={form.date}
              onChange={(e) => setForm({ ...form, date: e.target.value })}
            />
            <Textarea
              placeholder="Describe brevemente tu caso..."
              rows={3}
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
            />
            <Button type="submit" className="w-full">
              Enviar solicitud
            </Button>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
