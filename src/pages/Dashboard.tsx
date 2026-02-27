// ✅ FULL UPDATED CODE (Dashboard + Projects UI + Front Projects Tabs)
// - Prevents crashes when technologies/images/category are null
// - Shows ALL projects in each tab (no "Show more")
// - Adds safe sorting even if created_at missing
// - Makes Dashboard Projects table + form safer (images/technologies)
// - Optional: adds Freelance tab if you use it

import { useState, useEffect, useMemo } from "react";
import { supabase } from "../integrations/supabase/client";
import {
  FolderKanban,
  Settings,
  PlusCircle,
  Edit3,
  Trash2,
  Mail,
  Code,
  Server,
  Brain,
  Wrench,
  Palette,
  Database,
  Briefcase,
  Image as ImageIcon,
  Eye,
} from "lucide-react";

// ============================
// Helpers (SAFE NORMALIZATION)
// ============================
const safeArray = (v: any) => (Array.isArray(v) ? v : []);
const safeString = (v: any) => (typeof v === "string" ? v : "");
const safeBool = (v: any) => !!v;

const normalizeCategory = (v: any) => {
  const c = safeString(v).toLowerCase();
  if (c === "wordpress") return "wordpress";
  if (c === "coding") return "coding";
  if (c === "design") return "design";
  if (c === "shopify") return "shopify";
  return "coding"; // default
};

const sortByCreatedAtDesc = (a: any, b: any) => {
  // if created_at missing, keep stable fallback
  const at = a?.created_at ? new Date(a.created_at).getTime() : 0;
  const bt = b?.created_at ? new Date(b.created_at).getTime() : 0;
  return bt - at;
};

const getFirstImage = (p: any) => {
  const imgs = safeArray(p?.images);
  return imgs?.[0] || "/placeholder.svg";
};

// ============================
// Dashboard Layout Component
// ============================
function DashboardLayout({ activeTab, setActiveTab, children }: any) {
  return (
    <div className="flex h-screen bg-gray-900 text-gray-100">
      {/* Sidebar */}
      <aside className="flex w-64 flex-col bg-gray-800 p-6">
        <h1 className="mb-10 text-2xl font-bold">My Dashboard</h1>

        <nav className="flex flex-col space-y-4">
          <a
            className={`flex cursor-pointer items-center space-x-2 ${
              activeTab === "projects"
                ? "text-white"
                : "text-gray-300 hover:text-white"
            }`}
            onClick={() => setActiveTab("projects")}
          >
            <FolderKanban size={18} />
            <span>Projects</span>
          </a>

          <a
            className={`flex cursor-pointer items-center space-x-2 ${
              activeTab === "skills"
                ? "text-white"
                : "text-gray-300 hover:text-white"
            }`}
            onClick={() => setActiveTab("skills")}
          >
            <Code size={18} />
            <span>Skills</span>
          </a>

          <a
            className={`flex cursor-pointer items-center space-x-2 ${
              activeTab === "contacts"
                ? "text-white"
                : "text-gray-300 hover:text-white"
            }`}
            onClick={() => setActiveTab("contacts")}
          >
            <Mail size={18} />
            <span>Contacts</span>
          </a>

          <a
            className={`flex cursor-pointer items-center space-x-2 ${
              activeTab === "experiences"
                ? "text-white"
                : "text-gray-300 hover:text-white"
            }`}
            onClick={() => setActiveTab("experiences")}
          >
            <Briefcase size={18} />
            <span>Experiences</span>
          </a>

          <a className="flex cursor-pointer items-center space-x-2 text-gray-300 hover:text-white">
            <Settings size={18} />
            <span>Settings</span>
          </a>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-8">{children}</main>
    </div>
  );
}

// ============================
// Projects Page (Dashboard)
// ============================
function ProjectsPage() {
  const [projects, setProjects] = useState<any[]>([]);
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const [projectForm, setProjectForm] = useState<any>({
    id: null,
    title: "",
    description: "",
    technologies: "",
    images: [],
    live_url: "",
    featured: false,
    category: "wordpress",
  });

  const [showProjectForm, setShowProjectForm] = useState(false);
  const [uploadError, setUploadError] = useState("");
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    const checkUser = async () => {
      const {
        data: { user },
        error,
      } = await supabase.auth.getUser();

      if (error || !user) {
        window.location.href = "/";
      } else {
        setUser(user);
        fetchProjects();
      }
    };

    checkUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchProjects = async () => {
    setLoading(true);
    setUploadError("");

    try {
      // ✅ try ordering by created_at (if exists)
      const { data, error } = await supabase
        .from("projects")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        // fallback: fetch without order, sort in JS
        console.warn("Order by created_at failed, fallback:", error.message);
        const fallback = await supabase.from("projects").select("*");
        if (fallback.error) {
          console.error("Fetch error:", fallback.error);
          setUploadError("Failed to fetch projects: " + fallback.error.message);
          setProjects([]);
        } else {
          const normalized = (fallback.data || []).map((p: any) => ({
            ...p,
            technologies: safeArray(p.technologies),
            images: safeArray(p.images),
            category: normalizeCategory(p.category),
            featured: safeBool(p.featured),
          }));
          setProjects(normalized.sort(sortByCreatedAtDesc));
        }
      } else {
        const normalized = (data || []).map((p: any) => ({
          ...p,
          technologies: safeArray(p.technologies),
          images: safeArray(p.images),
          category: normalizeCategory(p.category),
          featured: safeBool(p.featured),
        }));
        setProjects(normalized);
      }
    } catch (err: any) {
      console.error("Unexpected error:", err);
      setUploadError("An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  const handleFileUpload = async (e: any) => {
    const files: FileList | null = e.target.files;
    if (!files || files.length === 0) return;

    setUploadError("");
    setUploading(true);

    const uploadedUrls: string[] = [];

    try {
      for (let file of Array.from(files)) {
        if (!file.type.startsWith("image/")) {
          setUploadError("Please upload only image files");
          continue;
        }

        if (!user?.id) {
          setUploadError("User not found. Please re-login.");
          continue;
        }

        const fileName = `${user.id}/${Date.now()}-${file.name}`;
        const { error: uploadError } = await supabase.storage
          .from("images")
          .upload(fileName, file);

        if (uploadError) {
          setUploadError(`Upload failed: ${uploadError.message}`);
          continue;
        }

        const {
          data: { publicUrl },
        } = supabase.storage.from("images").getPublicUrl(fileName);

        if (publicUrl) uploadedUrls.push(publicUrl);
      }

      if (uploadedUrls.length > 0) {
        setProjectForm((prev: any) => ({
          ...prev,
          images: [...safeArray(prev.images), ...uploadedUrls],
        }));
      }
    } catch (err) {
      console.error(err);
      setUploadError("An unexpected error occurred during upload");
    } finally {
      setUploading(false);
    }
  };

  const removeImage = (index: number) => {
    setProjectForm((prev: any) => ({
      ...prev,
      images: safeArray(prev.images).filter((_: any, i: number) => i !== index),
    }));
  };

  const handleProjectSubmit = async (e: any) => {
    e.preventDefault();
    setUploadError("");

    try {
      const techArray = projectForm.technologies
        ? safeString(projectForm.technologies)
            .split(",")
            .map((t) => t.trim())
            .filter((t) => t !== "")
        : [];

      const payload = {
        title: safeString(projectForm.title),
        description: safeString(projectForm.description),
        technologies: techArray,
        images: safeArray(projectForm.images),
        live_url: safeString(projectForm.live_url),
        featured: safeBool(projectForm.featured),
        category: normalizeCategory(projectForm.category),
      };

      let res: any;
      if (projectForm.id) {
        res = await supabase.from("projects").update(payload).eq("id", projectForm.id);
      } else {
        res = await supabase.from("projects").insert([payload]);
      }

      if (res.error) {
        setUploadError(res.error.message);
      } else {
        setProjectForm({
          id: null,
          title: "",
          description: "",
          technologies: "",
          images: [],
          live_url: "",
          featured: false,
          category: "wordpress",
        });

        setShowProjectForm(false);
        fetchProjects();
      }
    } catch (err) {
      console.error(err);
      setUploadError("An unexpected error occurred");
    }
  };

  const handleEditProject = (project: any) => {
    setProjectForm({
      id: project.id,
      title: safeString(project.title),
      description: safeString(project.description),
      technologies: safeArray(project.technologies).join(", "),
      images: safeArray(project.images),
      live_url: safeString(project.live_url),
      featured: safeBool(project.featured),
      category: normalizeCategory(project.category),
    });

    setShowProjectForm(true);
  };

  const handleDeleteProject = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this project?")) {
      try {
        const { error } = await supabase.from("projects").delete().eq("id", id);
        if (error) setUploadError("Failed to delete project: " + error.message);
        else fetchProjects();
      } catch (err) {
        console.error(err);
        setUploadError("An unexpected error occurred");
      }
    }
  };

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-gray-900 text-white">
        <div className="h-12 w-12 animate-spin rounded-full border-b-2 border-white" />
      </div>
    );
  }

  return (
    <>
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-3xl font-bold">Projects</h2>

        <button
          onClick={() => {
            setProjectForm({
              id: null,
              title: "",
              description: "",
              technologies: "",
              images: [],
              live_url: "",
              featured: false,
              category: "wordpress",
            });
            setShowProjectForm(true);
            setUploadError("");
          }}
          className="flex items-center rounded-lg bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700"
        >
          <PlusCircle size={18} className="mr-2" />
          Add Project
        </button>
      </div>

      {uploadError && (
        <div className="mb-4 rounded bg-red-800 p-3 text-white">
          <div className="mb-1 font-bold">Error:</div>
          <div>{uploadError}</div>
        </div>
      )}

      {projects.length === 0 ? (
        <div className="rounded-lg bg-gray-800 p-6 text-center">
          <FolderKanban size={48} className="mx-auto mb-4 text-gray-400" />
          <h3 className="mb-2 text-xl font-semibold">No projects yet</h3>
          <p className="mb-4 text-gray-400">Get started by adding your first project</p>
          <button
            onClick={() => setShowProjectForm(true)}
            className="rounded-lg bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700"
          >
            Add Your First Project
          </button>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-lg bg-gray-800 shadow">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-700 text-gray-300">
                <th className="p-3">Image</th>
                <th className="p-3">Title</th>
                <th className="p-3">Category</th>
                <th className="p-3">Technologies</th>
                <th className="p-3">Featured</th>
                <th className="p-3">Actions</th>
              </tr>
            </thead>

            <tbody>
              {projects.map((p) => {
                const img = getFirstImage(p);
                const techText = safeArray(p.technologies).join(", ");
                return (
                  <tr
                    key={p.id}
                    className="border-b border-gray-700 hover:bg-gray-700"
                  >
                    <td className="p-3">
                      {img ? (
                        <img
                          src={img}
                          alt={p.title || "Project"}
                          className="h-16 w-16 rounded object-cover"
                          onError={(e: any) => {
                            e.currentTarget.src =
                              "https://via.placeholder.com/64?text=Error";
                          }}
                        />
                      ) : (
                        <div className="flex h-16 w-16 items-center justify-center rounded bg-gray-700 text-xs">
                          No Image
                        </div>
                      )}
                    </td>

                    <td className="p-3">{p.title}</td>
                    <td className="p-3 capitalize">{normalizeCategory(p.category)}</td>

                    <td className="p-3">{techText || "-"}</td>

                    <td className="p-3">{p.featured ? "Done" : "False"}</td>

                    <td className="flex space-x-2 p-3">
                      <button
                        onClick={() => handleEditProject(p)}
                        className="rounded bg-yellow-500 px-3 py-1 text-white hover:bg-yellow-600"
                        title="Edit"
                      >
                        <Edit3 size={16} />
                      </button>

                      <button
                        onClick={() => handleDeleteProject(p.id)}
                        className="rounded bg-red-600 px-3 py-1 text-white hover:bg-red-700"
                        title="Delete"
                      >
                        <Trash2 size={16} />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* Form Drawer */}
      {showProjectForm && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black bg-opacity-50">
          <div className="w-full max-w-md overflow-y-auto bg-gray-900 p-6">
            <h2 className="mb-4 text-xl font-semibold">
              {projectForm.id ? "✏️ Edit Project" : "➕ Add Project"}
            </h2>

            {uploadError && (
              <div className="mb-4 rounded bg-red-800 p-3 text-white">
                <div className="mb-1 font-bold">Error:</div>
                <div>{uploadError}</div>
              </div>
            )}

            <form onSubmit={handleProjectSubmit} className="space-y-4">
              <input
                type="text"
                placeholder="Title"
                value={projectForm.title}
                onChange={(e: any) =>
                  setProjectForm({ ...projectForm, title: e.target.value })
                }
                className="w-full rounded-lg border border-gray-700 bg-gray-800 p-3 text-white"
                required
              />

              <textarea
                placeholder="Description"
                value={projectForm.description}
                onChange={(e: any) =>
                  setProjectForm({ ...projectForm, description: e.target.value })
                }
                className="w-full rounded-lg border border-gray-700 bg-gray-800 p-3 text-white"
                rows={3}
              />

              <input
                type="text"
                placeholder="Technologies (comma separated)"
                value={projectForm.technologies}
                onChange={(e: any) =>
                  setProjectForm({ ...projectForm, technologies: e.target.value })
                }
                className="w-full rounded-lg border border-gray-700 bg-gray-800 p-3 text-white"
              />

              <div>
                <label className="mb-2 block text-sm">Upload Images</label>
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="w-full text-sm text-gray-300 file:mr-4 file:rounded-full file:border-0 file:bg-indigo-600 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white hover:file:bg-indigo-700"
                  disabled={uploading}
                />
                <p className="mt-1 text-xs text-gray-400">You can select multiple images</p>
                {uploading && (
                  <p className="mt-1 text-sm text-yellow-400">Uploading images...</p>
                )}
              </div>

              {safeArray(projectForm.images).length > 0 && (
                <div className="mt-3">
                  <p className="mb-2 text-sm">Image Previews:</p>

                  <div className="flex flex-wrap gap-2">
                    {safeArray(projectForm.images).map((img: string, i: number) => (
                      <div key={i} className="relative">
                        <img
                          src={img}
                          alt={`preview-${i}`}
                          className="h-20 w-20 rounded-lg border border-gray-700 object-cover"
                          onError={(e: any) => {
                            e.currentTarget.src =
                              "https://via.placeholder.com/80?text=Error";
                          }}
                        />
                        <button
                          type="button"
                          onClick={() => removeImage(i)}
                          className="absolute -right-2 -top-2 rounded-full bg-red-600 p-1 text-white"
                          title="Remove"
                        >
                          <Trash2 size={12} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <input
                type="url"
                placeholder="Live URL"
                value={projectForm.live_url}
                onChange={(e: any) =>
                  setProjectForm({ ...projectForm, live_url: e.target.value })
                }
                className="w-full rounded-lg border border-gray-700 bg-gray-800 p-3 text-white"
              />

              <select
                value={projectForm.category}
                onChange={(e: any) =>
                  setProjectForm({ ...projectForm, category: e.target.value })
                }
                className="w-full rounded-lg border border-gray-700 bg-gray-800 p-3 text-white"
              >
                <option value="wordpress">Wordpress</option>
                <option value="coding">Coding</option>
                <option value="design">Design</option>
                <option value="shopify">Shopify</option>
              </select>

              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={!!projectForm.featured}
                  onChange={(e: any) =>
                    setProjectForm({ ...projectForm, featured: e.target.checked })
                  }
                />
                <span>Featured</span>
              </label>

              <div className="flex space-x-3">
                <button
                  type="submit"
                  className="flex-1 rounded-lg bg-indigo-600 py-2 text-white hover:bg-indigo-700"
                  disabled={uploading}
                >
                  {projectForm.id ? "Update Project" : "Add Project"}
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setShowProjectForm(false);
                    setUploadError("");
                  }}
                  className="flex-1 rounded-lg bg-gray-700 py-2 text-white hover:bg-gray-600"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

// ============================
// Skills Page (unchanged logic, just safer array rendering)
// ============================
function SkillsPage() {
  const [skills, setSkills] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const [skillForm, setSkillForm] = useState<any>({
    id: null,
    title: "",
    category: "",
    skills: "",
    icon_name: "Code",
    color: "primary",
  });

  const [showSkillForm, setShowSkillForm] = useState(false);
  const [uploadError, setUploadError] = useState("");

  const iconOptions = [
    { value: "Code", label: "Code", icon: <Code className="h-4 w-4" /> },
    { value: "Server", label: "Server", icon: <Server className="h-4 w-4" /> },
    { value: "Brain", label: "Brain", icon: <Brain className="h-4 w-4" /> },
    { value: "Wrench", label: "Wrench", icon: <Wrench className="h-4 w-4" /> },
    { value: "Palette", label: "Palette", icon: <Palette className="h-4 w-4" /> },
    { value: "Database", label: "Database", icon: <Database className="h-4 w-4" /> },
  ];

  const colorOptions = ["primary", "secondary", "accent"];

  useEffect(() => {
    const checkUser = async () => {
      const {
        data: { user },
        error,
      } = await supabase.auth.getUser();

      if (error || !user) {
        window.location.href = "/";
      } else {
        fetchSkills();
      }
    };

    checkUser();
  }, []);

  const fetchSkills = async () => {
    setLoading(true);
    setUploadError("");
    try {
      const { data, error } = await supabase.from("skills").select("*").order("title");
      if (error) {
        console.error("Fetch skills error:", error);
        setUploadError("Failed to fetch skills: " + error.message);
      } else {
        setSkills(data || []);
      }
    } catch (err) {
      console.error("Unexpected error:", err);
      setUploadError("An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  const handleSkillSubmit = async (e: any) => {
    e.preventDefault();
    setUploadError("");

    try {
      const skillsArray = skillForm.skills
        ? safeString(skillForm.skills)
            .split(",")
            .map((s) => s.trim())
            .filter((s) => s !== "")
        : [];

      const payload = {
        title: safeString(skillForm.title),
        category: safeString(skillForm.category),
        skills: skillsArray,
        icon_name: safeString(skillForm.icon_name),
        color: safeString(skillForm.color),
      };

      let res: any;
      if (skillForm.id) res = await supabase.from("skills").update(payload).eq("id", skillForm.id);
      else res = await supabase.from("skills").insert([payload]);

      if (res.error) setUploadError(res.error.message);
      else {
        setSkillForm({
          id: null,
          title: "",
          category: "",
          skills: "",
          icon_name: "Code",
          color: "primary",
        });
        setShowSkillForm(false);
        fetchSkills();
      }
    } catch (err) {
      console.error(err);
      setUploadError("An unexpected error occurred");
    }
  };

  const handleEditSkill = (skill: any) => {
    setSkillForm({
      id: skill.id,
      title: safeString(skill.title),
      category: safeString(skill.category),
      skills: safeArray(skill.skills).join(", "),
      icon_name: safeString(skill.icon_name) || "Code",
      color: safeString(skill.color) || "primary",
    });
    setShowSkillForm(true);
  };

  const handleDeleteSkill = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this skill category?")) {
      try {
        const { error } = await supabase.from("skills").delete().eq("id", id);
        if (error) setUploadError("Failed to delete skill: " + error.message);
        else fetchSkills();
      } catch (err) {
        console.error(err);
        setUploadError("An unexpected error occurred");
      }
    }
  };

  const renderIcon = (iconName: string) => {
    switch (iconName) {
      case "Code":
        return <Code className="h-5 w-5" />;
      case "Server":
        return <Server className="h-5 w-5" />;
      case "Brain":
        return <Brain className="h-5 w-5" />;
      case "Wrench":
        return <Wrench className="h-5 w-5" />;
      case "Palette":
        return <Palette className="h-5 w-5" />;
      case "Database":
        return <Database className="h-5 w-5" />;
      default:
        return <Code className="h-5 w-5" />;
    }
  };

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-gray-900 text-white">
        <div className="h-12 w-12 animate-spin rounded-full border-b-2 border-white" />
      </div>
    );
  }

  return (
    <>
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-3xl font-bold">Skills</h2>

        <button
          onClick={() => {
            setSkillForm({
              id: null,
              title: "",
              category: "",
              skills: "",
              icon_name: "Code",
              color: "primary",
            });
            setShowSkillForm(true);
            setUploadError("");
          }}
          className="flex items-center rounded-lg bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700"
        >
          <PlusCircle size={18} className="mr-2" />
          Add Skill
        </button>
      </div>

      {uploadError && (
        <div className="mb-4 rounded bg-red-800 p-3 text-white">
          <div className="mb-1 font-bold">Error:</div>
          <div>{uploadError}</div>
        </div>
      )}

      {skills.length === 0 ? (
        <div className="rounded-lg bg-gray-800 p-6 text-center">
          <Code size={48} className="mx-auto mb-4 text-gray-400" />
          <h3 className="mb-2 text-xl font-semibold">No skills yet</h3>
          <p className="mb-4 text-gray-400">Get started by adding your first skill category</p>
          <button
            onClick={() => setShowSkillForm(true)}
            className="rounded-lg bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700"
          >
            Add Your First Skill
          </button>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-lg bg-gray-800 shadow">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-700 text-gray-300">
                <th className="p-3">Icon</th>
                <th className="p-3">Title</th>
                <th className="p-3">Category</th>
                <th className="p-3">Skills</th>
                <th className="p-3">Color</th>
                <th className="p-3">Actions</th>
              </tr>
            </thead>

            <tbody>
              {skills.map((s) => (
                <tr key={s.id} className="border-b border-gray-700 hover:bg-gray-700">
                  <td className="p-3">
                    <div className="rounded-full bg-primary/10 p-2 text-primary">
                      {renderIcon(s.icon_name)}
                    </div>
                  </td>

                  <td className="p-3">{s.title}</td>
                  <td className="p-3 capitalize">{s.category}</td>

                  <td className="p-3">
                    {safeArray(s.skills).length ? safeArray(s.skills).join(", ") : "-"}
                  </td>

                  <td className="p-3 capitalize">{s.color}</td>

                  <td className="flex space-x-2 p-3">
                    <button
                      onClick={() => handleEditSkill(s)}
                      className="rounded bg-yellow-500 px-3 py-1 text-white hover:bg-yellow-600"
                      title="Edit"
                    >
                      <Edit3 size={16} />
                    </button>

                    <button
                      onClick={() => handleDeleteSkill(s.id)}
                      className="rounded bg-red-600 px-3 py-1 text-white hover:bg-red-700"
                      title="Delete"
                    >
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Skill Form Drawer */}
      {showSkillForm && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black bg-opacity-50">
          <div className="w-full max-w-md overflow-y-auto bg-gray-900 p-6">
            <h2 className="mb-4 text-xl font-semibold">
              {skillForm.id ? "✏️ Edit Skill" : "➕ Add Skill"}
            </h2>

            {uploadError && (
              <div className="mb-4 rounded bg-red-800 p-3 text-white">
                <div className="mb-1 font-bold">Error:</div>
                <div>{uploadError}</div>
              </div>
            )}

            <form onSubmit={handleSkillSubmit} className="space-y-4">
              <input
                type="text"
                placeholder="Title"
                value={skillForm.title}
                onChange={(e: any) => setSkillForm({ ...skillForm, title: e.target.value })}
                className="w-full rounded-lg border border-gray-700 bg-gray-800 p-3 text-white"
                required
              />

              <input
                type="text"
                placeholder="Category (e.g., development, design, tools)"
                value={skillForm.category}
                onChange={(e: any) => setSkillForm({ ...skillForm, category: e.target.value })}
                className="w-full rounded-lg border border-gray-700 bg-gray-800 p-3 text-white"
                required
              />

              <textarea
                placeholder="Skills (comma separated)"
                value={skillForm.skills}
                onChange={(e: any) => setSkillForm({ ...skillForm, skills: e.target.value })}
                className="w-full rounded-lg border border-gray-700 bg-gray-800 p-3 text-white"
                rows={3}
                required
              />

              <div>
                <label className="mb-2 block text-sm">Icon</label>
                <div className="grid grid-cols-3 gap-2">
                  {iconOptions.map((icon) => (
                    <button
                      type="button"
                      key={icon.value}
                      className={`flex items-center justify-center rounded-lg border p-3 ${
                        skillForm.icon_name === icon.value
                          ? "border-indigo-500 bg-indigo-500/10"
                          : "border-gray-700 hover:border-gray-600"
                      }`}
                      onClick={() => setSkillForm({ ...skillForm, icon_name: icon.value })}
                    >
                      {icon.icon}
                      <span className="ml-2 text-sm">{icon.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm">Color</label>
                <div className="flex gap-2">
                  {colorOptions.map((color) => (
                    <button
                      type="button"
                      key={color}
                      className={`flex-1 rounded-lg py-2 text-sm font-medium ${
                        skillForm.color === color
                          ? "ring-2 ring-indigo-500 ring-offset-2 ring-offset-gray-900"
                          : ""
                      } ${
                        color === "primary"
                          ? "bg-primary/20 text-primary"
                          : color === "secondary"
                          ? "bg-secondary/20 text-secondary"
                          : "bg-accent/20 text-accent"
                      }`}
                      onClick={() => setSkillForm({ ...skillForm, color })}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex space-x-3">
                <button
                  type="submit"
                  className="flex-1 rounded-lg bg-indigo-600 py-2 text-white hover:bg-indigo-700"
                >
                  {skillForm.id ? "Update Skill" : "Add Skill"}
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setShowSkillForm(false);
                    setUploadError("");
                  }}
                  className="flex-1 rounded-lg bg-gray-700 py-2 text-white hover:bg-gray-600"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

// ============================
// Experiences Page (safe arrays)
// ============================
function ExperiencesPage() {
  const [experiences, setExperiences] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const [experienceForm, setExperienceForm] = useState<any>({
    id: null,
    title: "",
    company: "",
    period: "",
    location: "",
    type: "",
    description: "",
    technologies: "",
    link: "",
  });

  const [showExperienceForm, setShowExperienceForm] = useState(false);
  const [uploadError, setUploadError] = useState("");

  const experienceTypeOptions = [
    "Full-time",
    "Part-time",
    "Contract",
    "Freelance",
    "Internship",
    "Volunteer",
  ];

  useEffect(() => {
    const checkUser = async () => {
      const {
        data: { user },
        error,
      } = await supabase.auth.getUser();

      if (error || !user) {
        window.location.href = "/";
      } else {
        fetchExperiences();
      }
    };

    checkUser();
  }, []);

  const fetchExperiences = async () => {
    setLoading(true);
    setUploadError("");
    try {
      const { data, error } = await supabase
        .from("experiences")
        .select("*")
        .order("period", { ascending: false });

      if (error) {
        console.error("Fetch experiences error:", error);
        setUploadError("Failed to fetch experiences: " + error.message);
      } else {
        setExperiences(data || []);
      }
    } catch (err) {
      console.error("Unexpected error:", err);
      setUploadError("An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  const handleExperienceSubmit = async (e: any) => {
    e.preventDefault();
    setUploadError("");

    try {
      const techArray = experienceForm.technologies
        ? safeString(experienceForm.technologies)
            .split(",")
            .map((t) => t.trim())
            .filter((t) => t !== "")
        : [];

      const payload = {
        title: safeString(experienceForm.title),
        company: safeString(experienceForm.company),
        period: safeString(experienceForm.period),
        location: safeString(experienceForm.location),
        type: safeString(experienceForm.type),
        description: safeString(experienceForm.description),
        technologies: techArray,
        link: safeString(experienceForm.link),
      };

      let res: any;
      if (experienceForm.id) res = await supabase.from("experiences").update(payload).eq("id", experienceForm.id);
      else res = await supabase.from("experiences").insert([payload]);

      if (res.error) setUploadError(res.error.message);
      else {
        setExperienceForm({
          id: null,
          title: "",
          company: "",
          period: "",
          location: "",
          type: "",
          description: "",
          technologies: "",
          link: "",
        });

        setShowExperienceForm(false);
        fetchExperiences();
      }
    } catch (err) {
      console.error(err);
      setUploadError("An unexpected error occurred");
    }
  };

  const handleEditExperience = (experience: any) => {
    setExperienceForm({
      id: experience.id,
      title: safeString(experience.title),
      company: safeString(experience.company),
      period: safeString(experience.period),
      location: safeString(experience.location),
      type: safeString(experience.type),
      description: safeString(experience.description),
      technologies: safeArray(experience.technologies).join(", "),
      link: safeString(experience.link),
    });

    setShowExperienceForm(true);
  };

  const handleDeleteExperience = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this experience?")) {
      try {
        const { error } = await supabase.from("experiences").delete().eq("id", id);
        if (error) setUploadError("Failed to delete experience: " + error.message);
        else fetchExperiences();
      } catch (err) {
        console.error(err);
        setUploadError("An unexpected error occurred");
      }
    }
  };

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-gray-900 text-white">
        <div className="h-12 w-12 animate-spin rounded-full border-b-2 border-white" />
      </div>
    );
  }

  return (
    <>
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-3xl font-bold">Experiences</h2>

        <button
          onClick={() => {
            setExperienceForm({
              id: null,
              title: "",
              company: "",
              period: "",
              location: "",
              type: "",
              description: "",
              technologies: "",
              link: "",
            });
            setShowExperienceForm(true);
            setUploadError("");
          }}
          className="flex items-center rounded-lg bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700"
        >
          <PlusCircle size={18} className="mr-2" />
          Add Experience
        </button>
      </div>

      {uploadError && (
        <div className="mb-4 rounded bg-red-800 p-3 text-white">
          <div className="mb-1 font-bold">Error:</div>
          <div>{uploadError}</div>
        </div>
      )}

      {experiences.length === 0 ? (
        <div className="rounded-lg bg-gray-800 p-6 text-center">
          <Briefcase size={48} className="mx-auto mb-4 text-gray-400" />
          <h3 className="mb-2 text-xl font-semibold">No experiences yet</h3>
          <p className="mb-4 text-gray-400">Get started by adding your first experience</p>
          <button
            onClick={() => setShowExperienceForm(true)}
            className="rounded-lg bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700"
          >
            Add Your First Experience
          </button>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-lg bg-gray-800 shadow">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-700 text-gray-300">
                <th className="p-3">Title</th>
                <th className="p-3">Company</th>
                <th className="p-3">Period</th>
                <th className="p-3">Type</th>
                <th className="p-3">Technologies</th>
                <th className="p-3">Actions</th>
              </tr>
            </thead>

            <tbody>
              {experiences.map((exp) => (
                <tr
                  key={exp.id}
                  className="border-b border-gray-700 align-top hover:bg-gray-700"
                >
                  <td className="p-3 font-semibold">{exp.title}</td>
                  <td className="p-3">{exp.company}</td>
                  <td className="p-3">{exp.period}</td>
                  <td className="p-3 capitalize">{exp.type}</td>
                  <td className="p-3">
                    {safeArray(exp.technologies).length
                      ? safeArray(exp.technologies).join(", ")
                      : "-"}
                  </td>
                  <td className="flex space-x-2 p-3">
                    <button
                      onClick={() => handleEditExperience(exp)}
                      className="rounded bg-yellow-500 px-3 py-1 text-white hover:bg-yellow-600"
                      title="Edit"
                    >
                      <Edit3 size={16} />
                    </button>
                    <button
                      onClick={() => handleDeleteExperience(exp.id)}
                      className="rounded bg-red-600 px-3 py-1 text-white hover:bg-red-700"
                      title="Delete"
                    >
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {showExperienceForm && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black bg-opacity-50">
          <div className="w-full max-w-md overflow-y-auto bg-gray-900 p-6">
            <h2 className="mb-4 text-xl font-semibold">
              {experienceForm.id ? "✏️ Edit Experience" : "➕ Add Experience"}
            </h2>

            {uploadError && (
              <div className="mb-4 rounded bg-red-800 p-3 text-white">
                <div className="mb-1 font-bold">Error:</div>
                <div>{uploadError}</div>
              </div>
            )}

            <form onSubmit={handleExperienceSubmit} className="space-y-4">
              <input
                type="text"
                placeholder="Title (e.g., Web Developer)"
                value={experienceForm.title}
                onChange={(e: any) =>
                  setExperienceForm({ ...experienceForm, title: e.target.value })
                }
                className="w-full rounded-lg border border-gray-700 bg-gray-800 p-3 text-white"
                required
              />

              <input
                type="text"
                placeholder="Company"
                value={experienceForm.company}
                onChange={(e: any) =>
                  setExperienceForm({ ...experienceForm, company: e.target.value })
                }
                className="w-full rounded-lg border border-gray-700 bg-gray-800 p-3 text-white"
                required
              />

              <input
                type="text"
                placeholder="Period (e.g., 4/2025 - Present)"
                value={experienceForm.period}
                onChange={(e: any) =>
                  setExperienceForm({ ...experienceForm, period: e.target.value })
                }
                className="w-full rounded-lg border border-gray-700 bg-gray-800 p-3 text-white"
                required
              />

              <input
                type="text"
                placeholder="Location (e.g., On-site, Remote)"
                value={experienceForm.location}
                onChange={(e: any) =>
                  setExperienceForm({ ...experienceForm, location: e.target.value })
                }
                className="w-full rounded-lg border border-gray-700 bg-gray-800 p-3 text-white"
                required
              />

              <select
                value={experienceForm.type}
                onChange={(e: any) =>
                  setExperienceForm({ ...experienceForm, type: e.target.value })
                }
                className="w-full rounded-lg border border-gray-700 bg-gray-800 p-3 text-white"
                required
              >
                <option value="">Select Type</option>
                {experienceTypeOptions.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>

              <textarea
                placeholder="Description"
                value={experienceForm.description}
                onChange={(e: any) =>
                  setExperienceForm({ ...experienceForm, description: e.target.value })
                }
                className="w-full rounded-lg border border-gray-700 bg-gray-800 p-3 text-white"
                rows={3}
                required
              />

              <input
                type="text"
                placeholder="Technologies (comma separated)"
                value={experienceForm.technologies}
                onChange={(e: any) =>
                  setExperienceForm({ ...experienceForm, technologies: e.target.value })
                }
                className="w-full rounded-lg border border-gray-700 bg-gray-800 p-3 text-white"
              />

              <input
                type="url"
                placeholder="Company URL (optional)"
                value={experienceForm.link}
                onChange={(e: any) =>
                  setExperienceForm({ ...experienceForm, link: e.target.value })
                }
                className="w-full rounded-lg border border-gray-700 bg-gray-800 p-3 text-white"
              />

              <div className="flex space-x-3">
                <button
                  type="submit"
                  className="flex-1 rounded-lg bg-indigo-600 py-2 text-white hover:bg-indigo-700"
                >
                  {experienceForm.id ? "Update Experience" : "Add Experience"}
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setShowExperienceForm(false);
                    setUploadError("");
                  }}
                  className="flex-1 rounded-lg bg-gray-700 py-2 text-white hover:bg-gray-600"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

// ============================
// Contacts Page (same)
// ============================
function ContactsPage() {
  const [messages, setMessages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let channel: any;

    const fetchMessages = async () => {
      try {
        const { data, error } = await supabase
          .from("contact_messages")
          .select("id, name, email, subject, message, created_at")
          .order("created_at", { ascending: false });

        if (error) {
          console.error("Fetch contacts error:", error);
          setError(error.message || "Failed to fetch messages");
        } else {
          setMessages(data || []);
        }
      } catch (err) {
        console.error("Unexpected error fetching contacts:", err);
        setError("An unexpected error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();

    // Realtime updates
    try {
      channel = supabase
        .channel("public:contact_messages")
        .on(
          "postgres_changes",
          { event: "INSERT", schema: "public", table: "contact_messages" },
          (payload: any) => {
            const newRow = payload.new;
            setMessages((prev) => [newRow, ...prev]);
          }
        )
        .subscribe();
    } catch (subErr) {
      console.warn("Realtime subscription could not be created:", subErr);
    }

    return () => {
      if (channel) supabase.removeChannel(channel);
    };
  }, []);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-gray-900 text-white">
        <div className="h-12 w-12 animate-spin rounded-full border-b-2 border-white" />
      </div>
    );
  }

  return (
    <>
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-3xl font-bold">Contact Messages</h2>
      </div>

      {error && (
        <div className="mb-4 rounded bg-red-800 p-3 text-white">
          <div className="mb-1 font-bold">Error:</div>
          <div>{error}</div>
        </div>
      )}

      {messages.length === 0 ? (
        <div className="rounded-lg bg-gray-800 p-6 text-center">
          <Mail size={48} className="mx-auto mb-4 text-gray-400" />
          <h3 className="mb-2 text-xl font-semibold">No messages yet</h3>
          <p className="mb-4 text-gray-400">Messages sent via the contact form will appear here.</p>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-lg bg-gray-800 shadow">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-700 text-gray-300">
                <th className="p-3">Name</th>
                <th className="p-3">Email</th>
                <th className="p-3">Subject</th>
                <th className="p-3">Message</th>
                <th className="p-3">Received</th>
              </tr>
            </thead>

            <tbody>
              {messages.map((m) => (
                <tr
                  key={m.id}
                  className="border-b border-gray-700 align-top hover:bg-gray-700"
                >
                  <td className="p-3 align-top">{m.name}</td>
                  <td className="p-3 align-top">{m.email}</td>
                  <td className="p-3 align-top">{m.subject}</td>
                  <td className="max-w-xl whitespace-pre-wrap p-3 align-top">{m.message}</td>
                  <td className="p-3 align-top">
                    {m.created_at ? new Date(m.created_at).toLocaleString() : "-"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}

// ============================
// Main Dashboard Component
// ============================
export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("projects");

  return (
    <DashboardLayout activeTab={activeTab} setActiveTab={setActiveTab}>
      {activeTab === "projects" && <ProjectsPage />}
      {activeTab === "skills" && <SkillsPage />}
      {activeTab === "contacts" && <ContactsPage />}
      {activeTab === "experiences" && <ExperiencesPage />}
    </DashboardLayout>
  );
}

/* ============================================================
   ✅ FRONT-END PROJECTS COMPONENT (Tabs show ALL projects)
   Put this in your website Projects section file.
   No "Show more". Safe against null technologies/images/category.
============================================================ */

export function ProjectsSectionFrontend() {
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from("projects")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching projects:", error.message, error);
        setProjects([]);
        setLoading(false);
        return;
      }

      const normalized = (data || []).map((p: any) => ({
        ...p,
        technologies: safeArray(p.technologies),
        images: safeArray(p.images),
        category: normalizeCategory(p.category),
        featured: safeBool(p.featured),
      }));

      setProjects(normalized);
      setLoading(false);
    };

    fetchProjects();
  }, []);

  const codingProjects = useMemo(
    () => projects.filter((p) => normalizeCategory(p.category) === "coding"),
    [projects]
  );
  const wordpressProjects = useMemo(
    () => projects.filter((p) => normalizeCategory(p.category) === "wordpress"),
    [projects]
  );
  const designProjects = useMemo(
    () => projects.filter((p) => normalizeCategory(p.category) === "design"),
    [projects]
  );
  const shopifyProjects = useMemo(
    () => projects.filter((p) => normalizeCategory(p.category) === "shopify"),
    [projects]
  );

  if (loading) return <p className="text-center">Loading projects...</p>;

  const ProjectCard = ({ project }: any) => {
    const techs = safeArray(project.technologies);
    const imgs = safeArray(project.images);
    const cover = imgs[0] || "/placeholder.svg";

    return (
      <div className="group overflow-hidden rounded-xl border border-white/10 bg-white/5">
        <div className="relative overflow-hidden">
          <img
            src={cover}
            alt={project.title || "Project"}
            className="h-60 w-full object-cover transition-transform duration-300 group-hover:scale-105"
            onError={(e: any) => (e.currentTarget.src = "/placeholder.svg")}
          />
        </div>

        <div className="p-5">
          <h3 className="text-lg font-semibold">{project.title}</h3>
          <p className="mt-2 text-sm text-white/70">{project.description}</p>

          <div className="mt-3 flex flex-wrap gap-2">
            {techs.map((t: string) => (
              <span
                key={t}
                className="rounded-full bg-white/10 px-3 py-1 text-xs text-white/90"
              >
                {t}
              </span>
            ))}
          </div>

          <div className="mt-4 flex items-center gap-3">
            {project.live_url ? (
              <a
                href={project.live_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center rounded-lg bg-indigo-600 px-3 py-2 text-sm text-white hover:bg-indigo-700"
              >
                <Eye className="mr-2 h-4 w-4" />
                Live Demo
              </a>
            ) : null}

            {imgs.length > 0 ? (
              <button
                type="button"
                onClick={() => window.open(imgs[0], "_blank")}
                className="inline-flex items-center rounded-lg bg-white/10 px-3 py-2 text-sm text-white hover:bg-white/15"
              >
                <ImageIcon className="mr-2 h-4 w-4" />
                Show Media
              </button>
            ) : null}
          </div>
        </div>
      </div>
    );
  };

  return (
    <section id="projects" className="py-20">
      <div className="container mx-auto px-4">
        <h2 className="mb-10 text-center text-4xl font-bold">All Projects</h2>

        {/* Simple Tabs without "show more" */}
        <div className="mb-6 flex flex-wrap justify-center gap-2">
          <a href="#coding" className="rounded-lg bg-white/10 px-4 py-2">Coding</a>
          <a href="#wordpress" className="rounded-lg bg-white/10 px-4 py-2">Wordpress</a>
          <a href="#design" className="rounded-lg bg-white/10 px-4 py-2">Design</a>
          {shopifyProjects.length > 0 && (
            <a href="#shopify" className="rounded-lg bg-white/10 px-4 py-2">Shopify</a>
          )}
        </div>

        <h3 id="coding" className="mb-4 text-2xl font-semibold">Coding</h3>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {codingProjects.map((p) => <ProjectCard key={p.id} project={p} />)}
        </div>

        <h3 id="wordpress" className="mt-10 mb-4 text-2xl font-semibold">Wordpress</h3>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {wordpressProjects.map((p) => <ProjectCard key={p.id} project={p} />)}
        </div>

        <h3 id="design" className="mt-10 mb-4 text-2xl font-semibold">Design</h3>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {designProjects.map((p) => <ProjectCard key={p.id} project={p} />)}
        </div>

        {shopifyProjects.length > 0 && (
          <>
            <h3 id="shopify" className="mt-10 mb-4 text-2xl font-semibold">Shopify</h3>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {shopifyProjects.map((p) => <ProjectCard key={p.id} project={p} />)}
            </div>
          </>
        )}
      </div>
    </section>
  );
}
