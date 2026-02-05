"use client";

import { useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
  Select,
  SelectItem,
} from "@heroui/react";
import { useTheme } from "@/lib/context/ThemeContext";
import { INPUT_CLASS_NAMES, SELECT_CLASS_NAMES } from "@/data/settings";

interface AddSiteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit?: (data: NewSiteData) => void;
}

export interface NewSiteData {
  siteName: string;
  domain: string;
  phpVersion: string;
  wpVersion: string;
  adminEmail: string;
}

const PHP_VERSIONS = [
  { key: "8.3", label: "PHP 8.3 (Latest)" },
  { key: "8.2", label: "PHP 8.2" },
  { key: "8.1", label: "PHP 8.1" },
];

const WP_VERSIONS = [
  { key: "latest", label: "WordPress 6.7 (Latest)" },
  { key: "6.6", label: "WordPress 6.6" },
  { key: "6.5", label: "WordPress 6.5" },
];

export function AddSiteModal({ isOpen, onClose, onSubmit }: AddSiteModalProps) {
  const { resolvedTheme } = useTheme();
  const isLight = resolvedTheme === "light";

  const [siteName, setSiteName] = useState("");
  const [domain, setDomain] = useState("");
  const [phpVersion, setPhpVersion] = useState<Set<string>>(new Set(["8.3"]));
  const [wpVersion, setWpVersion] = useState<Set<string>>(new Set(["latest"]));
  const [adminEmail, setAdminEmail] = useState("");
  const [isCreating, setIsCreating] = useState(false);

  const inputClassNames = isLight
    ? {
        inputWrapper:
          "bg-zinc-50 border-zinc-200 hover:border-zinc-300 group-data-[focus=true]:border-emerald-500/50 !rounded-xl",
        input: "text-zinc-800 placeholder:text-zinc-400",
      }
    : INPUT_CLASS_NAMES;

  const selectClassNames = isLight
    ? {
        trigger:
          "bg-zinc-50 border-zinc-200 hover:border-zinc-300 data-[focus=true]:border-emerald-500/50 !rounded-xl text-zinc-800",
        value: "text-zinc-800",
        popoverContent: "bg-white border border-zinc-200 rounded-xl",
        listbox: "bg-white",
      }
    : SELECT_CLASS_NAMES;

  const handleSubmit = async () => {
    if (!siteName || !domain || !adminEmail) return;

    setIsCreating(true);

    const data: NewSiteData = {
      siteName,
      domain,
      phpVersion: Array.from(phpVersion)[0],
      wpVersion: Array.from(wpVersion)[0],
      adminEmail,
    };

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    onSubmit?.(data);
    setIsCreating(false);
    handleClose();
  };

  const handleClose = () => {
    setSiteName("");
    setDomain("");
    setPhpVersion(new Set(["8.3"]));
    setWpVersion(new Set(["latest"]));
    setAdminEmail("");
    onClose();
  };

  const isFormValid = siteName && domain && adminEmail;

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      size="2xl"
      backdrop="opaque"
      placement="center"
      hideCloseButton
      classNames={{
        backdrop: "bg-black/70",
        base: isLight
          ? "bg-white border border-zinc-200 shadow-2xl max-w-[500px] rounded-2xl"
          : "bg-[#18181B] border border-[#27272A] shadow-2xl max-w-[500px] rounded-2xl",
        header: isLight ? "border-b border-zinc-200" : "border-b border-[#27272A]",
        body: "py-6",
        footer: isLight ? "border-t border-zinc-200" : "border-t border-[#27272A]",
      }}
    >
      <ModalContent>
        <ModalHeader className="flex items-center justify-between gap-3">
          <div>
            <h2
              className={`text-lg font-semibold ${
                isLight ? "text-zinc-800" : "text-zinc-100"
              }`}
            >
              Create New Site
            </h2>
            <p className="text-xs text-zinc-500 font-normal">
              Set up a new WordPress installation
            </p>
          </div>
          <button
            onClick={handleClose}
            className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${
              isLight
                ? "hover:bg-zinc-100 text-zinc-400 hover:text-zinc-600"
                : "hover:bg-zinc-800 text-zinc-500 hover:text-zinc-300"
            }`}
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </ModalHeader>

        <ModalBody>
          <div className="space-y-5">
            {/* Site Name & Domain */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] uppercase tracking-wider text-zinc-500 font-medium mb-2">
                  Site Name <span className="text-rose-400">*</span>
                </label>
                <Input
                  value={siteName}
                  onValueChange={setSiteName}
                  placeholder="My Awesome Site"
                  classNames={inputClassNames}
                  variant="bordered"
                  size="md"
                />
              </div>
              <div>
                <label className="block text-[11px] uppercase tracking-wider text-zinc-500 font-medium mb-2">
                  Domain <span className="text-rose-400">*</span>
                </label>
                <Input
                  value={domain}
                  onValueChange={setDomain}
                  placeholder="example.com"
                  classNames={inputClassNames}
                  variant="bordered"
                  size="md"
                  startContent={
                    <span className="text-zinc-500 text-sm">https://</span>
                  }
                />
              </div>
            </div>

            {/* PHP & WordPress Version */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] uppercase tracking-wider text-zinc-500 font-medium mb-2">
                  PHP Version
                </label>
                <Select
                  selectedKeys={phpVersion}
                  onSelectionChange={(keys) => setPhpVersion(keys as Set<string>)}
                  classNames={selectClassNames}
                  variant="bordered"
                >
                  {PHP_VERSIONS.map((v) => (
                    <SelectItem key={v.key}>{v.label}</SelectItem>
                  ))}
                </Select>
              </div>
              <div>
                <label className="block text-[11px] uppercase tracking-wider text-zinc-500 font-medium mb-2">
                  WordPress Version
                </label>
                <Select
                  selectedKeys={wpVersion}
                  onSelectionChange={(keys) => setWpVersion(keys as Set<string>)}
                  classNames={selectClassNames}
                  variant="bordered"
                >
                  {WP_VERSIONS.map((v) => (
                    <SelectItem key={v.key}>{v.label}</SelectItem>
                  ))}
                </Select>
              </div>
            </div>

            {/* Admin Email */}
            <div>
              <label className="block text-[11px] uppercase tracking-wider text-zinc-500 font-medium mb-2">
                Admin Email <span className="text-rose-400">*</span>
              </label>
              <Input
                value={adminEmail}
                onValueChange={setAdminEmail}
                placeholder="admin@example.com"
                type="email"
                classNames={inputClassNames}
                variant="bordered"
                size="md"
              />
              <p className="text-xs text-zinc-500 mt-1.5">
                WordPress admin credentials will be sent to this email
              </p>
            </div>

            {/* Info Box */}
            <div
              className={`rounded-xl p-4 flex items-start gap-3 ${
                isLight
                  ? "bg-emerald-50 border border-emerald-200"
                  : "bg-emerald-500/5 border border-emerald-500/20"
              }`}
            >
              <svg
                className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <div>
                <p
                  className={`text-sm font-medium ${
                    isLight ? "text-emerald-800" : "text-emerald-400"
                  }`}
                >
                  Your site will be ready in seconds
                </p>
                <p
                  className={`text-xs mt-0.5 ${
                    isLight ? "text-emerald-700" : "text-emerald-400/70"
                  }`}
                >
                  Includes SSL certificate, automated backups, and staging environment
                </p>
              </div>
            </div>
          </div>
        </ModalBody>

        <ModalFooter>
          <Button
            variant="flat"
            onPress={handleClose}
            className={`font-medium text-sm rounded-xl h-10 px-5 ${
              isLight
                ? "bg-zinc-100 text-zinc-600 hover:bg-zinc-200 hover:text-zinc-800"
                : "bg-[#27272A] text-zinc-400 hover:text-zinc-200"
            }`}
          >
            Cancel
          </Button>
          <Button
            onPress={handleSubmit}
            isDisabled={!isFormValid}
            isLoading={isCreating}
            className="bg-gradient-to-r from-emerald-500 to-emerald-600 text-white font-semibold text-sm rounded-xl h-10 px-5 shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isCreating ? "Creating..." : "Create Site"}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
