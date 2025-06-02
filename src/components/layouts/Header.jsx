import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Avatar,
  AvatarImage,
  AvatarFallback,
} from "@/components/ui/avatar.jsx";
import { LinkIcon, LogOut } from "lucide-react";

function Header() {
  const navigate = useNavigate();
  const user = true;
  return (
    <>
      <nav className="mx-6 py-12 flex justify-between items-center">
        <Link>
          <img src="/logo.png" className="h-16 mx-6" alt="Trimrr logo" />
        </Link>
        <div>
          {!user ? (
            <Button className="mx-6" onClick={() => navigate("/auth")}>
              Login
            </Button>
          ) : (
            <DropdownMenu>
              <DropdownMenuTrigger className="rounded-full outline-none overflow-hidden">
                <Avatar>
                  <AvatarImage  src="https://github.com/shadcn.png" />
                  <AvatarFallback >Arslan Shah</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="">
                  <span>
                    <LinkIcon className="mr-2 h-4 w-4" />
                  </span>
                   Links
                </DropdownMenuItem>
                 <DropdownMenuItem className="text-red-400">
                  <span>
                    <LogOut className="mr-2 h-4 w-4" />
                  </span>
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </nav>
    </>
  );
}

export default Header;
