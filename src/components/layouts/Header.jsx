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
import { useUrlState } from "@/UrlContext";
import { logout } from "../../../db/apiAuth";
import useFetch from "../../hooks/useFetch";
import { BarLoader } from "react-spinners";

function Header() {
  const navigate = useNavigate();
  const { user, fetchUser } = useUrlState();
  const { loading, fn: fnLogout } = useFetch(logout);

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
                <Avatar className="w-12 h-12 mr-[10px]">
                  <AvatarImage
                    src={user?.user_metadata?.profile_pic}
                    className="w-full h-full object-cover"
                  />
                  <AvatarFallback>{user?.user_metadata?.name}</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <Link to='/dashboard'>
                  <DropdownMenuItem className="">
                    <span>
                      <LinkIcon className="mr-2 h-4 w-4" />
                    </span>
                    Links
                  </DropdownMenuItem>
                </Link>
                <DropdownMenuItem
                  className="text-red-400"
                  onClick={async () => {
                    await fnLogout();
                    navigate("/");
                  }}
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
        {loading && <BarLoader width={"100%"} color="#36d7b7" />}
      </nav>
    </>
  );
}

export default Header;
