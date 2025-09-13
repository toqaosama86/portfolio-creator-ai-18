import { useState, useEffect } from "react";
import { supabase } from "../integrations/supabase/client";
import {
  LayoutDashboard,
  FolderKanban,
  Settings,
  PlusCircle,
  Edit3,
  Trash2,
  Code,
  Server,
  Brain,
  Wrench,
  Palette,
  Database,
  Briefcase,
  MapPin,
  Calendar,
  ExternalLink
} from "lucide-react";

// Dashboard Layout Component
function DashboardLayout({ activeTab, setActiveTab, children }) {
  return (
    <div className="flex h-screen bg-gray-900 text-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 p-6 flex flex-col">
        <h1 className="text-2xl font-bold mb-10"> My Dashboard</h1>
        <nav className="flex flex-col space-y-4">
          <a 
            className={`flex items-center space-x-2 cursor-pointer ${activeTab === "projects" ? "text-white" : "text-gray-300 hover:text-white"}`}
            onClick={() => setActiveTab("projects")}
          >
            <FolderKanban size={18} />
            <span>Projects</span>
          </a>
          <a 
            className={`flex items-center space-x-2 cursor-pointer ${activeTab === "skills" ? "text-white" : "text-gray-300 hover:text-white"}`}
            onClick={() => setActiveTab("skills")}
          >
            <Code size={18} />
            <span>Skills</span>
          </a>
          <a 
            className={`flex items-center space-x-2 cursor-pointer ${activeTab === "experiences" ? "text-white" : "text-gray-300 hover:text-white"}`}
            onClick={() => setActiveTab("experiences")}
          >
            <Briefcase size={18} />
            <span>Experiences</span>
          </a>
          <a className="flex items-center space-x-2 text-gray-300 hover:text-white cursor-pointer">
            <Settings size={18} />
            <span>Settings</span>
          </a>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}

// Projects Page Component
function ProjectsPage({ setActiveTab }) {
  const [projects, setProjects] = useState([]);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [projectForm, setProjectForm] = useState({
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
      const { data: { user }, error } = await supabase.auth.getUser();
      
      if (error || !user) {
        window.location.href = "/";
      } else {
        setUser(user);
        fetchProjects();
      }
    };
    checkUser();
  }, []);

  const fetchProjects = async () => {
    try {
      const { data, error } = await supabase.from("projects").select("*");
      if (error) {
        console.error("Fetch error:", error);
        setUploadError("Failed to fetch projects: " + error.message);
      } else {
        setProjects(data);
      }
    } catch (err) {
      console.error("Unexpected error:", err);
      setUploadError("An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  const handleFileUpload = async (e) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploadError("");
    setUploading(true);
    const uploadedUrls = [];

    try {
      for (let file of files) {
        if (!file.type.startsWith('image/')) {
          setUploadError("Please upload only image files");
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

        const { data: { publicUrl } } = supabase.storage
          .from("images")
          .getPublicUrl(fileName);

        if (publicUrl) {
          uploadedUrls.push(publicUrl);
        }
      }

      if (uploadedUrls.length > 0) {
        setProjectForm((prev) => ({
          ...prev,
          images: [...prev.images, ...uploadedUrls],
        }));
      }
    } catch (err) {
      setUploadError("An unexpected error occurred during upload");
    } finally {
      setUploading(false);
    }
  };

  const removeImage = (index) => {
    setProjectForm((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  };

  const handleProjectSubmit = async (e) => {
    e.preventDefault();
    setUploadError("");

    try {
      const techArray = projectForm.technologies
        ? projectForm.technologies.split(",").map((t) => t.trim()).filter(t => t !== "")
        : [];

      const payload = {
        title: projectForm.title,
        description: projectForm.description,
        technologies: techArray,
        images: projectForm.images,
        live_url: projectForm.live_url,
        featured: projectForm.featured,
        category: projectForm.category,
      };

      let res;
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
      setUploadError("An unexpected error occurred");
    }
  };

  const handleEditProject = (project) => {
    setProjectForm({
      id: project.id,
      title: project.title,
      description: project.description,
      technologies: Array.isArray(project.technologies)
        ? project.technologies.join(", ")
        : project.technologies || "",
      images: Array.isArray(project.images) 
        ? project.images 
        : project.images ? [project.images] : [],
      live_url: project.live_url || "",
      featured: project.featured,
      category: project.category || "wordpress",
    });
    setShowProjectForm(true);
  };

  const handleDeleteProject = async (id) => {
    if (window.confirm("Are you sure you want to delete this project?")) {
      try {
        const { error } = await supabase.from("projects").delete().eq("id", id);
        if (error) {
          setUploadError("Failed to delete project: " + error.message);
        } else {
          fetchProjects();
        }
      } catch (err) {
        setUploadError("An unexpected error occurred");
      }
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-900 text-white">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
      </div>
    );
  }

  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold">📊 Projects</h2>
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
          className="bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded-lg flex items-center"
        >
          <PlusCircle size={18} className="mr-2" />
          Add Project
        </button>
      </div>

      {uploadError && (
        <div className="bg-red-800 text-white p-3 rounded mb-4">
          <div className="font-bold mb-1">Error:</div>
          <div>{uploadError}</div>
        </div>
      )}

      {projects.length === 0 ? (
        <div className="bg-gray-800 p-6 rounded-lg text-center">
          <FolderKanban size={48} className="mx-auto text-gray-400 mb-4" />
          <h3 className="text-xl font-semibold mb-2">No projects yet</h3>
          <p className="text-gray-400 mb-4">Get started by adding your first project</p>
          <button
            onClick={() => setShowProjectForm(true)}
            className="bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded-lg"
          >
            Add Your First Project
          </button>
        </div>
      ) : (
        <div className="overflow-x-auto bg-gray-800 rounded-lg shadow">
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
              {projects.map((p) => (
                <tr
                  key={p.id}
                  className="border-b border-gray-700 hover:bg-gray-700"
                >
                  <td className="p-3">
                    {p.images && p.images.length > 0 && p.images[0] ? (
                      <img
                        src={p.images[0]}
                        alt={p.title}
                        className="w-16 h-16 object-cover rounded"
                        onError={(e) => {
                          e.target.src = "https://via.placeholder.com/64?text=Error"
                        }}
                      />
                    ) : (
                      <div className="w-16 h-16 bg-gray-700 rounded flex items-center justify-center text-xs">
                        No Image
                      </div>
                    )}
                  </td>
                  <td className="p-3">{p.title}</td>
                  <td className="p-3 capitalize">{p.category}</td>
                  <td className="p-3">
                    {Array.isArray(p.technologies)
                      ? p.technologies.join(", ")
                      : p.technologies}
                  </td>
                  <td className="p-3">{p.featured ? "Done" : "False"}</td>
                  <td className="p-3 flex space-x-2">
                    <button
                      onClick={() => handleEditProject(p)}
                      className="bg-yellow-500 hover:bg-yellow-600 px-3 py-1 rounded text-white"
                    >
                      <Edit3 size={16} />
                    </button>
                    <button
                      onClick={() => handleDeleteProject(p.id)}
                      className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded text-white"
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

      {showProjectForm && (
        <div className="fixed inset-0 flex justify-end bg-black bg-opacity-50 z-50">
          <div className="w-full max-w-md bg-gray-900 p-6 overflow-y-auto">
            <h2 className="text-xl font-semibold mb-4">
              {projectForm.id ? "✏️ Edit Project" : "➕ Add Project"}
            </h2>

            {uploadError && (
              <div className="bg-red-800 text-white p-3 rounded mb-4">
                <div className="font-bold mb-1">Error:</div>
                <div>{uploadError}</div>
              </div>
            )}

            <form onSubmit={handleProjectSubmit} className="space-y-4">
              <input
                type="text"
                placeholder="Title"
                value={projectForm.title}
                onChange={(e) => setProjectForm({ ...projectForm, title: e.target.value })}
                className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-white"
                required
              />

              <textarea
                placeholder="Description"
                value={projectForm.description}
                onChange={(e) =>
                  setProjectForm({ ...projectForm, description: e.target.value })
                }
                className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-white"
                rows={3}
              />

              <input
                type="text"
                placeholder="Technologies (comma separated)"
                value={projectForm.technologies}
                onChange={(e) =>
                  setProjectForm({ ...projectForm, technologies: e.target.value })
                }
                className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-white"
              />

              <div>
                <label className="block mb-2 text-sm">Upload Images</label>
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="w-full text-sm text-gray-300 file:mr-4 file:py-2 file:px-4 
                             file:rounded-full file:border-0 file:text-sm 
                             file:font-semibold file:bg-indigo-600 file:text-white 
                             hover:file:bg-indigo-700"
                  disabled={uploading}
                />
                <p className="text-xs text-gray-400 mt-1">
                  You can select multiple images
                </p>
                {uploading && <p className="text-sm text-yellow-400 mt-1">Uploading images...</p>}
              </div>

              {projectForm.images.length > 0 && (
                <div className="mt-3">
                  <p className="text-sm mb-2">Image Previews:</p>
                  <div className="flex flex-wrap gap-2">
                    {projectForm.images.map((img, i) => (
                      <div key={i} className="relative">
                        <img
                          src={img}
                          alt={`preview-${i}`}
                          className="w-20 h-20 object-cover rounded-lg border border-gray-700"
                          onError={(e) => {
                            e.target.src = "https://via.placeholder.com/80?text=Error"
                          }}
                        />
                        <button
                          type="button"
                          onClick={() => removeImage(i)}
                          className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full p-1"
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
                onChange={(e) => setProjectForm({ ...projectForm, live_url: e.target.value })}
                className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-white"
              />

              <select
                value={projectForm.category}
                onChange={(e) => setProjectForm({ ...projectForm, category: e.target.value })}
                className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-white"
              >
                <option value="wordpress">Wordpress</option>
                <option value="coding">Coding</option>
                <option value="design">Design</option>
              </select>

              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={projectForm.featured}
                  onChange={(e) =>
                    setProjectForm({ ...projectForm, featured: e.target.checked })
                  }
                />
                <span>Featured</span>
              </label>

              <div className="flex space-x-3">
                <button
                  type="submit"
                  className="flex-1 bg-indigo-600 hover:bg-indigo-700 py-2 rounded-lg text-white"
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
                  className="flex-1 bg-gray-700 hover:bg-gray-600 py-2 rounded-lg text-white"
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

// Skills Page Component
function SkillsPage({ setActiveTab }) {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [skillForm, setSkillForm] = useState({
    id: null,
    title: "",
    category: "",
    skills: "",
    icon_name: "Code",
    color: "primary"
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

  const colorOptions = [
    "primary",
    "secondary",
    "accent"
  ];

  useEffect(() => {
    const checkUser = async () => {
      const { data: { user }, error } = await supabase.auth.getUser();
      
      if (error || !user) {
        window.location.href = "/";
      } else {
        fetchSkills();
      }
    };
    checkUser();
  }, []);

  const fetchSkills = async () => {
    try {
      const { data, error } = await supabase.from("skills").select("*").order('title');
      if (error) {
        console.error("Fetch skills error:", error);
        setUploadError("Failed to fetch skills: " + error.message);
      } else {
        setSkills(data);
      }
    } catch (err) {
      console.error("Unexpected error:", err);
      setUploadError("An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  const handleSkillSubmit = async (e) => {
    e.preventDefault();
    setUploadError("");

    try {
      const skillsArray = skillForm.skills
        ? skillForm.skills.split(",").map((s) => s.trim()).filter(s => s !== "")
        : [];

      const payload = {
        title: skillForm.title,
        category: skillForm.category,
        skills: skillsArray,
        icon_name: skillForm.icon_name,
        color: skillForm.color,
      };

      let res;
      if (skillForm.id) {
        res = await supabase.from("skills").update(payload).eq("id", skillForm.id);
      } else {
        res = await supabase.from("skills").insert([payload]);
      }

      if (res.error) {
        setUploadError(res.error.message);
      } else {
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
      setUploadError("An unexpected error occurred");
    }
  };

  const handleEditSkill = (skill) => {
    setSkillForm({
      id: skill.id,
      title: skill.title,
      category: skill.category || "",
      skills: Array.isArray(skill.skills) 
        ? skill.skills.join(", ") 
        : skill.skills || "",
      icon_name: skill.icon_name || "Code",
      color: skill.color || "primary"
    });
    setShowSkillForm(true);
  };

  const handleDeleteSkill = async (id) => {
    if (window.confirm("Are you sure you want to delete this skill category?")) {
      try {
        const { error } = await supabase.from("skills").delete().eq("id", id);
        if (error) {
          setUploadError("Failed to delete skill: " + error.message);
        } else {
          fetchSkills();
        }
      } catch (err) {
        setUploadError("An unexpected error occurred");
      }
    }
  };

  const renderIcon = (iconName) => {
    switch(iconName) {
      case "Code": return <Code className="h-5 w-5" />;
      case "Server": return <Server className="h-5 w-5" />;
      case "Brain": return <Brain className="h-5 w-5" />;
      case "Wrench": return <Wrench className="h-5 w-5" />;
      case "Palette": return <Palette className="h-5 w-5" />;
      case "Database": return <Database className="h-5 w-5" />;
      default: return <Code className="h-5 w-5" />;
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-900 text-white">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
      </div>
    );
  }

  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold">💻 Skills</h2>
        <button
          onClick={() => {
            setSkillForm({
              id: null,
              title: "",
              category: "",
              skills: "",
              icon_name: "Code",
              color: "primary"
            });
            setShowSkillForm(true);
            setUploadError("");
          }}
          className="bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded-lg flex items-center"
        >
          <PlusCircle size={18} className="mr-2" />
          Add Skill
        </button>
      </div>

      {uploadError && (
        <div className="bg-red-800 text-white p-3 rounded mb-4">
          <div className="font-bold mb-1">Error:</div>
          <div>{uploadError}</div>
        </div>
      )}

      {skills.length === 0 ? (
        <div className="bg-gray-800 p-6 rounded-lg text-center">
          <Code size={48} className="mx-auto text-gray-400 mb-4" />
          <h3 className="text-xl font-semibold mb-2">No skills yet</h3>
          <p className="text-gray-400 mb-4">Get started by adding your first skill category</p>
          <button
            onClick={() => setShowSkillForm(true)}
            className="bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded-lg"
          >
            Add Your First Skill
          </button>
        </div>
      ) : (
        <div className="overflow-x-auto bg-gray-800 rounded-lg shadow">
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
                <tr
                  key={s.id}
                  className="border-b border-gray-700 hover:bg-gray-700"
                >
                  <td className="p-3">
                    <div className="p-2 rounded-full bg-primary/10 text-primary">
                      {renderIcon(s.icon_name)}
                    </div>
                  </td>
                  <td className="p-3">{s.title}</td>
                  <td className="p-3 capitalize">{s.category}</td>
                  <td className="p-3">
                    {Array.isArray(s.skills)
                      ? s.skills.join(", ")
                      : s.skills}
                  </td>
                  <td className="p-3 capitalize">{s.color}</td>
                  <td className="p-3 flex space-x-2">
                    <button
                      onClick={() => handleEditSkill(s)}
                      className="bg-yellow-500 hover:bg-yellow-600 px-3 py-1 rounded text-white"
                    >
                      <Edit3 size={16} />
                    </button>
                    <button
                      onClick={() => handleDeleteSkill(s.id)}
                      className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded text-white"
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

      {showSkillForm && (
        <div className="fixed inset-0 flex justify-end bg-black bg-opacity-50 z-50">
          <div className="w-full max-w-md bg-gray-900 p-6 overflow-y-auto">
            <h2 className="text-xl font-semibold mb-4">
              {skillForm.id ? "✏️ Edit Skill" : "➕ Add Skill"}
            </h2>

            {uploadError && (
              <div className="bg-red-800 text-white p-3 rounded mb-4">
                <div className="font-bold mb-1">Error:</div>
                <div>{uploadError}</div>
              </div>
            )}

            <form onSubmit={handleSkillSubmit} className="space-y-4">
              <input
                type="text"
                placeholder="Title"
                value={skillForm.title}
                onChange={(e) => setSkillForm({ ...skillForm, title: e.target.value })}
                className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-white"
                required
              />

              <input
                type="text"
                placeholder="Category (e.g., development, design, tools)"
                value={skillForm.category}
                onChange={(e) => setSkillForm({ ...skillForm, category: e.target.value })}
                className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-white"
                required
              />

              <textarea
                placeholder="Skills (comma separated)"
                value={skillForm.skills}
                onChange={(e) =>
                  setSkillForm({ ...skillForm, skills: e.target.value })
                }
                className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-white"
                rows={3}
                required
              />

              <div>
                <label className="block mb-2 text-sm">Icon</label>
                <div className="grid grid-cols-3 gap-2">
                  {iconOptions.map(icon => (
                    <button
                      type="button"
                      key={icon.value}
                      className={`flex items-center justify-center p-3 rounded-lg border ${
                        skillForm.icon_name === icon.value 
                          ? 'border-indigo-500 bg-indigo-500/10' 
                          : 'border-gray-700 hover:border-gray-600'
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
                <label className="block mb-2 text-sm">Color</label>
                <div className="flex gap-2">
                  {colorOptions.map(color => (
                    <button
                      type="button"
                      key={color}
                      className={`flex-1 py-2 rounded-lg text-sm font-medium ${
                        skillForm.color === color 
                          ? 'ring-2 ring-offset-2 ring-offset-gray-900 ring-indigo-500' 
                          : ''
                      } ${
                        color === 'primary' ? 'bg-primary/20 text-primary' :
                        color === 'secondary' ? 'bg-secondary/20 text-secondary' :
                        'bg-accent/20 text-accent'
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
                  className="flex-1 bg-indigo-600 hover:bg-indigo-700 py-2 rounded-lg text-white"
                >
                  {skillForm.id ? "Update Skill" : "Add Skill"}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowSkillForm(false);
                    setUploadError("");
                  }}
                  className="flex-1 bg-gray-700 hover:bg-gray-600 py-2 rounded-lg text-white"
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

// Experiences Page Component
function ExperiencesPage({ setActiveTab }) {
  const [experiences, setExperiences] = useState([]);
  const [loading, setLoading] = useState(true);
  const [experienceForm, setExperienceForm] = useState({
    id: null,
    title: "",
    company: "",
    period: "",
    location: "",
    type: "",
    description: "",
    technologies: "",
    link: ""
  });
  const [showExperienceForm, setShowExperienceForm] = useState(false);
  const [uploadError, setUploadError] = useState("");

  const experienceTypeOptions = [
    "Full-time",
    "Part-time",
    "Contract",
    "Freelance",
    "Internship",
    "Volunteer"
  ];

  useEffect(() => {
    const checkUser = async () => {
      const { data: { user }, error } = await supabase.auth.getUser();
      
      if (error || !user) {
        window.location.href = "/";
      } else {
        fetchExperiences();
      }
    };
    checkUser();
  }, []);

  const fetchExperiences = async () => {
    try {
      const { data, error } = await supabase.from("experiences").select("*").order('period', { ascending: false });
      if (error) {
        console.error("Fetch experiences error:", error);
        setUploadError("Failed to fetch experiences: " + error.message);
      } else {
        setExperiences(data);
      }
    } catch (err) {
      console.error("Unexpected error:", err);
      setUploadError("An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  const handleExperienceSubmit = async (e) => {
    e.preventDefault();
    setUploadError("");

    try {
      const techArray = experienceForm.technologies
        ? experienceForm.technologies.split(",").map((t) => t.trim()).filter(t => t !== "")
        : [];

      const payload = {
        title: experienceForm.title,
        company: experienceForm.company,
        period: experienceForm.period,
        location: experienceForm.location,
        type: experienceForm.type,
        description: experienceForm.description,
        technologies: techArray,
        link: experienceForm.link,
      };

      let res;
      if (experienceForm.id) {
        res = await supabase.from("experiences").update(payload).eq("id", experienceForm.id);
      } else {
        res = await supabase.from("experiences").insert([payload]);
      }

      if (res.error) {
        setUploadError(res.error.message);
      } else {
        setExperienceForm({
          id: null,
          title: "",
          company: "",
          period: "",
          location: "",
          type: "",
          description: "",
          technologies: "",
          link: ""
        });
        setShowExperienceForm(false);
        fetchExperiences();
      }
    } catch (err) {
      setUploadError("An unexpected error occurred");
    }
  };

  const handleEditExperience = (experience) => {
    setExperienceForm({
      id: experience.id,
      title: experience.title,
      company: experience.company,
      period: experience.period,
      location: experience.location,
      type: experience.type,
      description: experience.description,
      technologies: Array.isArray(experience.technologies) 
        ? experience.technologies.join(", ") 
        : experience.technologies || "",
      link: experience.link || ""
    });
    setShowExperienceForm(true);
  };

  const handleDeleteExperience = async (id) => {
    if (window.confirm("Are you sure you want to delete this experience?")) {
      try {
        const { error } = await supabase.from("experiences").delete().eq("id", id);
        if (error) {
          setUploadError("Failed to delete experience: " + error.message);
        } else {
          fetchExperiences();
        }
      } catch (err) {
        setUploadError("An unexpected error occurred");
      }
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-900 text-white">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
      </div>
    );
  }

  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold">💼 Experiences</h2>
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
              link: ""
            });
            setShowExperienceForm(true);
            setUploadError("");
          }}
          className="bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded-lg flex items-center"
        >
          <PlusCircle size={18} className="mr-2" />
          Add Experience
        </button>
      </div>

      {uploadError && (
        <div className="bg-red-800 text-white p-3 rounded mb-4">
          <div className="font-bold mb-1">Error:</div>
          <div>{uploadError}</div>
        </div>
      )}

      {experiences.length === 0 ? (
        <div className="bg-gray-800 p-6 rounded-lg text-center">
          <Briefcase size={48} className="mx-auto text-gray-400 mb-4" />
          <h3 className="text-xl font-semibold mb-2">No experiences yet</h3>
          <p className="text-gray-400 mb-4">Get started by adding your first experience</p>
          <button
            onClick={() => setShowExperienceForm(true)}
            className="bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded-lg"
          >
            Add Your First Experience
          </button>
        </div>
      ) : (
        <div className="overflow-x-auto bg-gray-800 rounded-lg shadow">
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
                  className="border-b border-gray-700 hover:bg-gray-700"
                >
                  <td className="p-3 font-semibold">{exp.title}</td>
                  <td className="p-3">{exp.company}</td>
                  <td className="p-3">{exp.period}</td>
                  <td className="p-3 capitalize">{exp.type}</td>
                  <td className="p-3">
                    {Array.isArray(exp.technologies)
                      ? exp.technologies.join(", ")
                      : exp.technologies}
                  </td>
                  <td className="p-3 flex space-x-2">
                    <button
                      onClick={() => handleEditExperience(exp)}
                      className="bg-yellow-500 hover:bg-yellow-600 px-3 py-1 rounded text-white"
                    >
                      <Edit3 size={16} />
                    </button>
                    <button
                      onClick={() => handleDeleteExperience(exp.id)}
                      className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded text-white"
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
        <div className="fixed inset-0 flex justify-end bg-black bg-opacity-50 z-50">
          <div className="w-full max-w-md bg-gray-900 p-6 overflow-y-auto">
            <h2 className="text-xl font-semibold mb-4">
              {experienceForm.id ? "✏️ Edit Experience" : "➕ Add Experience"}
            </h2>

            {uploadError && (
              <div className="bg-red-800 text-white p-3 rounded mb-4">
                <div className="font-bold mb-1">Error:</div>
                <div>{uploadError}</div>
              </div>
            )}

            <form onSubmit={handleExperienceSubmit} className="space-y-4">
              <input
                type="text"
                placeholder="Title (e.g., Web Developer)"
                value={experienceForm.title}
                onChange={(e) => setExperienceForm({ ...experienceForm, title: e.target.value })}
                className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-white"
                required
              />

              <input
                type="text"
                placeholder="Company"
                value={experienceForm.company}
                onChange={(e) => setExperienceForm({ ...experienceForm, company: e.target.value })}
                className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-white"
                required
              />

              <input
                type="text"
                placeholder="Period (e.g., 4/2025 - Present)"
                value={experienceForm.period}
                onChange={(e) => setExperienceForm({ ...experienceForm, period: e.target.value })}
                className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-white"
                required
              />

              <input
                type="text"
                placeholder="Location (e.g., On-site, Remote)"
                value={experienceForm.location}
                onChange={(e) => setExperienceForm({ ...experienceForm, location: e.target.value })}
                className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-white"
                required
              />

              <select
                value={experienceForm.type}
                onChange={(e) => setExperienceForm({ ...experienceForm, type: e.target.value })}
                className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-white"
                required
              >
                <option value="">Select Type</option>
                {experienceTypeOptions.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>

              <textarea
                placeholder="Description"
                value={experienceForm.description}
                onChange={(e) =>
                  setExperienceForm({ ...experienceForm, description: e.target.value })
                }
                className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-white"
                rows={3}
                required
              />

              <input
                type="text"
                placeholder="Technologies (comma separated)"
                value={experienceForm.technologies}
                onChange={(e) =>
                  setExperienceForm({ ...experienceForm, technologies: e.target.value })
                }
                className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-white"
              />

              <input
                type="url"
                placeholder="Company URL (optional)"
                value={experienceForm.link}
                onChange={(e) => setExperienceForm({ ...experienceForm, link: e.target.value })}
                className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-white"
              />

              <div className="flex space-x-3">
                <button
                  type="submit"
                  className="flex-1 bg-indigo-600 hover:bg-indigo-700 py-2 rounded-lg text-white"
                >
                  {experienceForm.id ? "Update Experience" : "Add Experience"}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowExperienceForm(false);
                    setUploadError("");
                  }}
                  className="flex-1 bg-gray-700 hover:bg-gray-600 py-2 rounded-lg text-white"
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

// Main Dashboard Component
export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("projects");

  return (
    <DashboardLayout activeTab={activeTab} setActiveTab={setActiveTab}>
      {activeTab === "projects" && <ProjectsPage setActiveTab={setActiveTab} />}
      {activeTab === "skills" && <SkillsPage setActiveTab={setActiveTab} />}
      {activeTab === "experiences" && <ExperiencesPage setActiveTab={setActiveTab} />}
    </DashboardLayout>
  );
}
